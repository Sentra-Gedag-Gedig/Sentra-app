import React, { useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { useRouter } from "expo-router";
import PhotoPreview from "@/features/e-kyc/components/photo-preview";

const CameraKTP = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center pb-2 text-lg">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const takenPhoto = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      if (takenPhoto?.uri && takenPhoto?.base64) {
        router.push({
          pathname: "/(e-kyc)/confirm-ktp",
          params: {
            photoUri: takenPhoto?.uri,
            photoBase64: takenPhoto?.base64,
          },
        });
      }
    }
  };

  return (
    <View className="flex-1 h-full w-full relative">
      <CameraView
        ref={cameraRef}
        style={{ width: "100%", height: "100%" }}
        className="flex-1 w-full h-full"
        facing={facing}
      >
        <View className="absolute top-10 w-full p-6 gap-y-2">
          <Text className="text-white text-3xl font-bold text-center">
            Ambil foto e-KTP
          </Text>
          <Text className="text-gray-300 text-xl text-center px-4">
            KTP anda terdeteksi di sebelah kiri kamera, arahkan kekiri dan
            majukkan hp nya sedikit!
          </Text>
        </View>
        <View className="absolute left-10 top-64 w-5/6 h-56 border-4 border-primary-400 rounded-xl">
          <View className="absolute top-12 left-60 w-20 h-28 border-2 border-primary-400 rounded-md" />
        </View>

        <TouchableOpacity
          onPress={handleTakePhoto}
          className="absolute bg-primary-400 left-10 bottom-20 w-5/6 items-center py-4 px-4 rounded-2xl"
        >
          <Text className="text-white font-bold text-2xl text-center">
            Ambil Foto
          </Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

export default CameraKTP;

import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useUser } from "@/context/user-context";
import * as ImageManipulator from "expo-image-manipulator";
import { useKTP } from "@/features/e-kyc/hooks/use-ktp";

const CameraKTP = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const router = useRouter();
  const { user, setUser } = useUser();
  const { mutate: KTP } = useKTP();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center pb-2 text-lg">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({ skipProcessing: true });
    if (photo?.uri) {
      setUser({
        ...user,
        ktp_photo: photo.uri,
      });
    }
    console.log(photo);
    await KTP({ uri: photo?.uri });

    console.log("KTP", photo?.uri);
    router.push({
      pathname: "/(e-kyc)/confirm-ktp",
    });
  };

  return (
    <View className="flex-1 h-full w-full relative">
      <CameraView
        ref={ref}
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
          onPress={takePicture}
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

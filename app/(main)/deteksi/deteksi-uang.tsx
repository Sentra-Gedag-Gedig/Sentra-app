import { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import SettingsModal from "@/features/deteksi-uang/components/settings-modal";
import CameraPermission from "@/components/Permission";
import { useDeteksi } from "@/features/deteksi-uang/hooks/use-deteksi";
import {
  DeteksiItem,
  DeteksiResponse,
} from "@/features/deteksi-uang/types/deteksi";
import {
  speakMessage,
  speakDetectionResults,
} from "@/features/deteksi-uang/utils/speech";
import CameraActions from "@/features/deteksi-uang/components/camera-action";

const DeteksiUang = () => {
  const [detectedAmount, setDetectedAmount] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [beepEnabled, setBeepEnabled] = useState<boolean>(true);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(true);
  const [facing, setFacing] = useState<CameraType>("back");

  const cameraRef = useRef<CameraView>(null);

  const handleDetectionResults = (res: DeteksiResponse) => {
    if (res?.data?.total) {
      const total = res.data.total;
      const details = res.data.details;
      setDetectedAmount(total);
      speakDetectionResults(total, details);
    } else {
      setDetectedAmount(null);
      if (beepEnabled) {
        speakMessage("Uang tidak terdeteksi. Silakan coba lagi.");
      }
    }
  };

  const { mutate: DeteksiPhoto, isPending } = useDeteksi(
    handleDetectionResults
  );

  CameraPermission();

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: false,
        exif: false,
        skipProcessing: true,
      });

      if (!photo) {
        console.error("Failed to take picture");
        return;
      }

      console.log("Photo taken:", photo.uri);

      const formData = new FormData();
      formData.append("image", {
        uri: photo.uri,
        name: "money.jpg",
        type: "image/jpeg",
      } as any);

      await DeteksiPhoto({ photo: formData });
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const toggleCameraType = () =>
    setFacing(facing === "back" ? "front" : "back");

  return (
    <View className="flex-1 bg-black">
      <View className="flex-[4]">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flashEnabled ? "on" : "off"}
        >
          <View className="absolute top-1/2 left-0 right-0 z-50 items-center -translate-y-1/2">
            {detectedAmount && (
              <Text className="text-white text-6xl font-bold">
                {detectedAmount}
              </Text>
            )}
          </View>
        </CameraView>
      </View>

      <View className="flex-[1] bg-white pt-10">
        <CameraActions
          isPending={isPending}
          onOpenSettings={() => setModalVisible(true)}
          onTakePicture={takePicture}
        />
      </View>

      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        beepEnabled={beepEnabled}
        setBeepEnabled={setBeepEnabled}
        flashEnabled={flashEnabled}
        setFlashEnabled={setFlashEnabled}
        cameraType={facing}
        toggleCameraType={toggleCameraType}
      />
    </View>
  );
};

export default DeteksiUang;

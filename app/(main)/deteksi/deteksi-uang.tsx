import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions, FlashMode } from "expo-camera";

import SettingsModal from "@/features/deteksi-uang/components/settings-modal";

const DeteksiUang = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [detectedAmount, setDetectedAmount] = useState<string | null>("2000");
  const [modalVisible, setModalVisible] = useState(false);
  const [beepEnabled, setBeepEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");

  const handleClick = () => {
    setModalVisible(true);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission?.granted) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-center mb-4">
          Kami membutuhkan izin Anda untuk mengakses kamera.
        </Text>
        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold">Berikan Izin Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="flex-[4]">
        <CameraView
          style={{ flex: 1 }}
          facing={cameraType}
          flash={flashEnabled ? "on" : "off"}
        >
          <View className="flex-1 justify-center items-center">
            {detectedAmount && (
              <View className="items-center">
                <Text className="text-white text-6xl font-bold">
                  {detectedAmount}
                </Text>
              </View>
            )}
          </View>
        </CameraView>
      </View>

      <View className="flex-[1] bg-white p-4">
        <TouchableOpacity
          className="bg-primary-400 p-4 w-full rounded-md self-center mb-4"
          onPress={handleClick}
        >
          <Text className="text-white font-bold text-center">PENGATURAN</Text>
        </TouchableOpacity>
      </View>

      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        beepEnabled={beepEnabled}
        setBeepEnabled={setBeepEnabled}
        flashEnabled={flashEnabled}
        setFlashEnabled={setFlashEnabled}
        cameraType={cameraType}
        toggleCameraType={() =>
          setCameraType(cameraType === "back" ? "front" : "back")
        }
      />
    </View>
  );
};

export default DeteksiUang;

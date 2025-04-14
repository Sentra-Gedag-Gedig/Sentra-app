"use client";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

const QRScanner = () => {
  const router = useRouter();
  const [flashOn, setFlashOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-center text-base mb-4">
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          <Text className="text-white text-base">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }: { data: any }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert("Scanned Data", `${data}`);
      setTimeout(() => setScanned(false), 3000);
      router.replace("/qrCode/pin-qr")
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white p-6">
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          focusable={true}
          onBarcodeScanned={handleScan}
        >
          <View className="flex-1 relative">
            <Text className="text-white text-center text-lg mt-4">
              Qr Code terdeteksi! arahkan kamera anda sebelah kiri dan maju
              untuk lebih dekat
            </Text>
            <View style={styles.overlay}>
              <View style={styles.scanArea} />
            </View>
          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

type SettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  beepEnabled: boolean;
  setBeepEnabled: (val: boolean) => void;
  flashEnabled: boolean;
  setFlashEnabled: (val: boolean) => void;
  cameraType: "front" | "back";
  toggleCameraType: () => void;
};

const SettingsModal = ({
  visible,
  onClose,
  beepEnabled,
  setBeepEnabled,
  flashEnabled,
  setFlashEnabled,
  cameraType,
  toggleCameraType,
}: SettingsModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="relative flex-row justify-center items-center h-16 bg-primary-400">
          <TouchableOpacity onPress={onClose} className="absolute left-4">
            <AntDesign name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Pengaturan</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View className="flex-row items-start mb-6">
            <AntDesign
              name="sound"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Bunyi Beep saat identifikasi
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Jika anda tidak sadar kapan pendeteksi aktif, nyalakan bunyi
                beep yang berulang
              </Text>
            </View>
            <Switch
              value={beepEnabled}
              onValueChange={setBeepEnabled}
              trackColor={{ false: "#767577", true: "#1a237e" }}
              thumbColor={beepEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-start mb-6">
            <MaterialCommunityIcons
              name="flashlight"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Cahaya Senter
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Senter dari perangkat anda meningkatkan akurasi deteksi di
                kondisi yang gelap
              </Text>
            </View>
            <Switch
              value={flashEnabled}
              onValueChange={setFlashEnabled}
              trackColor={{ false: "#767577", true: "#1a237e" }}
              thumbColor={flashEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-center mb-6">
            <MaterialCommunityIcons
              name="camera"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <TouchableOpacity className="flex-1" onPress={toggleCameraType}>
              <Text className="text-base font-semibold text-gray-900">
                Ganti Kamera {cameraType === "back" ? "depan" : "belakang"}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Saat ini menggunakan kamera{" "}
                {cameraType === "back" ? "belakang" : "depan"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-6">
            <MaterialIcons
              name="privacy-tip"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <TouchableOpacity className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-6">
            <Ionicons
              name="create-sharp"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <TouchableOpacity className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Syarat dan Penggunaan
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-2">
            <MaterialIcons
              name="info"
              size={32}
              color="#00027d"
              className="mr-4 mt-1"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Versi Aplikasi
              </Text>
              <Text className="text-sm text-gray-500 mt-1">2.27.0</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SettingsModal;

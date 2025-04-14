import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 rounded-2xl p-6 items-center justify-center">
          <View className="mb-4 w-full items-center justify-center">
            <Ionicons name="exit-sharp" size={150} color="#00027d" />
          </View>

          <Text className="text-center text-lg font-bold mb-6 text-gray-800">
            Apakah anda yakin ingin keluar dari akun anda
          </Text>

          <View className="flex-row justify-between w-full px-6">
            <TouchableOpacity onPress={onConfirm}>
              <Text className="text-red-600 text-lg font-bold">Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-green-600 text-lg font-bold">Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

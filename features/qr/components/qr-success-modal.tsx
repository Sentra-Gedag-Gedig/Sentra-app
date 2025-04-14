import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

type Props = {
  visible: boolean;
};

const QRSuccessModal = ({ visible }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-1 bg-white justify-center items-center">
        <Image source={require("@/assets/images/cheer.png")} />
        <Text className="text-2xl font-bold text-primary-400">
          Pembayaran Anda Berhasil!!
        </Text>
        <View className="w-full flex items-center">
          <TouchableOpacity
            onPress={() => {
              router.replace("/(main)/home");
            }}
            className="bg-primary-400 w-4/5 py-2 rounded-md mt-4"
          >
            <Text className="text-center text-white font-bold text-lg">
              KEMBALI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QRSuccessModal;

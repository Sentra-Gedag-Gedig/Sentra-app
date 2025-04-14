import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmPhoneModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-end items-center bg-black/50">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10 w-full max-w-md self-center">
          <Image
            source={require("../../../assets/images/woman-thinking.png")}
            className="self-center"
          />
          <Text className="text-center text-2xl font-extrabold mb-2 text-black">
            Yakin Mau Ubah Nomor HP?
          </Text>
          <Text className="text-center text-base mb-6 text-gray-700">
            Kamu akan memutuskan aplikasi lain yang sebelumnya terhubung dengan
            akun Sentralinapan
          </Text>

          <View className="flex-row justify-between gap-x-6">
            <TouchableOpacity
              className="flex-1 bg-[#E6E6F2] py-4 rounded-full items-center"
              onPress={onConfirm}
            >
              <Text className="text-primary-400 font-bold">Ya, Ubah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-primary-400 py-4 rounded-full items-center"
              onPress={onClose}
            >
              <Text className="text-white font-bold">Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPhoneModal;

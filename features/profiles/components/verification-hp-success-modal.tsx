import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
};
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const VerificationSuccessHPModal = ({ visible, onClose }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 items-center justify-center bg-white w-full h-full">
        <View className="items-center justify-center px-8 w-full">
          <MaterialIcons name="contact-phone" size={200} color="#00027d" />
          <Text className="font-bold text-center text-4xl w-fit mb-2">
            Nomor Telepon berhasil dimodifikasi
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary-400 w-full px-8 py-3 rounded-3xl mt-4"
          >
            <Text className="text-white font-bold text-lg text-center">
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default VerificationSuccessHPModal;

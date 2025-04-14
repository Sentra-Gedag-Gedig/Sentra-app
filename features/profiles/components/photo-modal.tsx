import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPickCamera: () => void;
  onPickGallery: () => void;
};

const PhotoModal: React.FC<Props> = ({
  visible,
  onClose,
  onPickCamera,
  onPickGallery,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-80 rounded-2xl p-5">
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2 text-start">
              Pilih Foto
            </Text>
            <TouchableOpacity className="py-2" onPress={onPickCamera}>
              <Text className="text-center text-black font-semibold">
                Ambil foto dari kamera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-2" onPress={onPickGallery}>
              <Text className="text-center text-black font-semibold">
                Pilih dari gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-end">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-red-600 font-bold">Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoModal;

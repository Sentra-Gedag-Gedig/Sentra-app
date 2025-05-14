import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  isPending: boolean;
  onOpenSettings: () => void;
  onTakePicture: () => void;
};

export default function CameraActions({ isPending, onOpenSettings, onTakePicture }: Props) {
  return (
    <View className="absolute flex-row bottom-[76px] gap-x-8 w-full px-4">
      <TouchableOpacity
        className="bg-primary-400 p-5 flex-1 rounded-md self-center mb-4"
        onPress={onOpenSettings}
      >
        <Text className="text-white font-bold text-center">PENGATURAN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`${
          isPending ? "bg-gray-400 opacity-70" : "bg-primary-400"
        } p-5 flex-1 rounded-md self-center mb-4`}
        onPress={onTakePicture}
        disabled={isPending}
      >
        <Text className="text-white font-bold text-center">
          {isPending ? "Memproses..." : "AMBIL FOTO"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

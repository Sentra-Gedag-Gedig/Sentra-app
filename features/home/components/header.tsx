import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export function Header() {
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-white text-lg font-bold">Hi, Selamat Datang</Text>
        <Text className="text-white text-xl font-normal">Richard</Text>
      </View>
      <TouchableOpacity className="p-2 bg-[#DFF7E2] rounded-full">
        <Ionicons name="notifications-outline" size={24} color="#093030" />
      </TouchableOpacity>
    </View>
  );
}

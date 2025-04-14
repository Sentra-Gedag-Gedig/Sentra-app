import { useUser } from "@/context/user-context";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export function Header() {
  const { user } = useUser();
  console.log("User data in Header:", user); 
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-white text-lg font-bold">Hi, Selamat Datang</Text>
        <Text className="text-white text-xl font-normal">{user?.name}</Text>
      </View>
      <TouchableOpacity className="p-2 bg-[#DFF7E2] rounded-full">
        <Ionicons name="notifications-outline" size={24} color="#093030" />
      </TouchableOpacity>
    </View>
  );
}

import { useUser } from "@/features/auth/hooks/use-user";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

export function Header() {
  const { data: user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#093030" />
        <Text className="text-white mt-4">Memuat...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-white text-lg font-bold">Hi, Selamat Datang</Text>
        <Text className="text-white text-xl font-normal">
          {user?.name || "Richard"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/(sentra-pay)/notification")}
        className="p-2 bg-[#DFF7E2] rounded-full"
      >
        <Ionicons name="notifications-outline" size={24} color="#093030" />
      </TouchableOpacity>
    </View>
  );
}

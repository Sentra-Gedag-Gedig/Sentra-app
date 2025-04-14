import {
  Text,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";

import LoginForm from "@/features/auth/components/forms/login-form";

export default function Login() {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View className="flex flex-col items-start justify-start w-full">
            <Text className="font-bold text-primary-400 text-2xl">
              Selamat datang kembali!
            </Text>
            <Text className="text-sm">
              Halo, mari log in untuk masuk ke aplikasi
            </Text>
          </View>

          <View
            className="flex items-center justify-center"
            style={{ marginTop: height > 600 ? 40 : 10 }}
          >
            <Image
              source={require("@/assets/images/key.png")}
              className="mt-2"
            />
          </View>
          <LoginForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

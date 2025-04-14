import {
  Text,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";

import RegisterForm from "@/features/auth/components/forms/register-form";

export default function Register() {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mt-6 mx-auto">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
          }}
        >
          <View className="flex flex-col items-start justify-start">
            <Text className="font-bold text-primary-400 text-2xl">
              Selamat datang di Sentra
            </Text>
            <Text>Halo, mari buat akun baru!</Text>
          </View>
          <View
            className="flex items-center justify-center"
            style={{
              marginTop: height > 600 ? 40 : 10,
            }}
          >
            <Image
              source={require("@/assets/images/Illustration.png")}
              className="mt-2"
            />
          </View>
          <RegisterForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

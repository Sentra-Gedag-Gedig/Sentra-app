import {
  Text,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CountrySelect from "@/features/auth/components/country-select";

export default function ForgotPassword() {
  const { width, height } = useWindowDimensions();
  const [dialCode, setDialCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <SafeAreaView accessibilityLabel="" className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView className="p-8 flex-grow">
          <View className="flex flex-col items-start justify-start w-full pr-8 space-y-2">
            <Text className="font-bold text-primary-400 text-2xl">
              Lupa Kata Sandi?
            </Text>
            <Text className="text-sm">
              Jangan khawatir, mohon masukkan email anda yang terhubung dengan
              akun anda
            </Text>
          </View>
          <View
            className="flex items-center justify-center"
            style={{
              marginTop: height > 600 ? 30 : 10,
            }}
          >
            <Image
              source={require("@/assets/images/forgot-password.png")}
              className="mt-2"
            />
          </View>
          <View className="mx-auto flex w-full">
            <Text className="text-base">Nomor Telepon</Text>
            <View className="flex flex-row gap-x-2">
              <CountrySelect onSelect={(code) => setDialCode(code)} />
              <TextInput
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className="border flex-1 border-[#CBCBCB] rounded-2xl mt-4 pl-5"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(auth)/verification-forgot-password",
                  params: {
                    phone: phoneNumber,
                    dialCode: dialCode,
                  },
                });
              }}
              className="bg-primary-400 py-4 rounded-2xl mt-8"
            >
              <Text className="text-white text-center font-bold text-lg">
                Kirim Kode
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row justify-center mt-6">
              <Text className="text-[#6A6A6A]">Ingat Kata Sandi?</Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/login");
                }}
              >
                <Text className="text-[#3629B7] font-semibold">Log in</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

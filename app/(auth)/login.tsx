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
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import CountryPicker from "@/features/auth/components/country-picker";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from 'expo-speech';

export default function Login() {
  const { width, height } = useWindowDimensions();
  const [dialCode, setDialCode] = useState("");
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [formLogin, setFormLogin] = useState({ phoneNumber: "", password: "" });

  const handleFormLogin = (key: "phoneNumber" | "password", value: string) => {
    setFormLogin((prev) => ({ ...prev, [key]: value }));
  };

  const checkBiometricAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricAvailable(hasHardware && isEnrolled);
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const handleBiometric = async () => {
    if (!isBiometricAvailable) {
      alert("Biometric is not available on this device");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();

    if (result.success) {
      const storedPhone = await AsyncStorage.getItem("phoneNumber");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedPhone && storedPassword) {
        setFormLogin({ phoneNumber: storedPhone, password: storedPassword });
      }
      alert("Biometric success");
      Speech.speak("Biometric success");
      router.push("/(e-kyc)/verification-ktp");
    } else {
      alert("Biometric failed");
    }
  };

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

          <View className="space-y-2 mx-auto pt-4 w-full">
            <View className="flex flex-row gap-x-2">
              <CountryPicker onSelect={(code) => setDialCode(code)} />
              <TextInput
                value={formLogin.phoneNumber}
                onChangeText={(text) => handleFormLogin("phoneNumber", text)}
                placeholder="Mobile Number"
                className="border flex-1 border-[#CBCBCB] rounded-2xl mt-4 pl-5"
                keyboardType="phone-pad"
              />
            </View>
            <TextInput
              secureTextEntry={true}
              value={formLogin.password}
              onChangeText={(text) => handleFormLogin("password", text)}
              placeholder="Password"
              className="border border-[#CBCBCB] rounded-2xl mt-4 pl-5"
            />
            <TouchableOpacity
              className="mt-2 flex items-end"
              onPress={() => router.push("/forgot-password")}
            >
              <Text>Lupa kata sandi?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.setItem(
                  "phoneNumber",
                  formLogin.phoneNumber
                );
                await AsyncStorage.setItem("password", formLogin.password);
                router.push("/(e-kyc)/verification-ktp");
              }}
              className="bg-primary-400 py-3 rounded-2xl mt-8"
            >
              <Text className="text-white text-center font-bold text-lg">
                Log in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border-2 border-[#B0B1D7] py-2 rounded-2xl mt-4">
              <View className="flex flex-row items-center justify-center gap-x-2">
                <Image source={require("../../assets/images/gmail.png")} />
                <Text className="text-lg font-rubik-medium font-bold text-black-300 ml-2 text-[#B0B1D7]">
                  Log in With Google
                </Text>
              </View>
            </TouchableOpacity>

            {isBiometricAvailable && (
              <TouchableOpacity
                onPress={handleBiometric}
                className="items-center my-6"
              >
                <Ionicons name="finger-print-sharp" size={50} color="#3629B7" />
              </TouchableOpacity>
            )}

            <View className="flex flex-row justify-center">
              <Text className="text-[#6A6A6A]">Belum memiliki akun? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text className="text-[#3629B7] font-semibold">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

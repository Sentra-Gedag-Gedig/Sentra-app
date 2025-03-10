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
import CountryPicker from "@/features/auth/components/country-picker";

export default function Register() {
  const { width, height } = useWindowDimensions();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState(false);
  const [dialCode, setDialCode] = useState("");

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
          <View className="space-y-2 mx-auto">
            <TextInput
              placeholder="Your Name"
              className="border border-[#CBCBCB] rounded-2xl mt-4 pl-5"
            />
            <View className="flex flex-row gap-x-2">
              <CountryPicker onSelect={(code) => setDialCode(code)} />
              <TextInput
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className="border flex-1 border-[#CBCBCB] rounded-2xl mt-4 pl-5"
              />
            </View>
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              className="border border-[#CBCBCB] rounded-2xl mt-4 pl-5"
            />
            <View className="flex flex-row items-center mt-6 mx-auto">
              <View className="flex flex-row flex-wrap items-center flex-1">
                <TouchableOpacity
                  className={`w-9 h-9 border border-[#CBCBCB] flex-shrink-0 rounded-md mr-2 justify-center items-center ${
                    checked ? "border-primary-400 " : ""
                  }`}
                  onPress={() => setChecked(!checked)}
                >
                  {checked && (
                    <Text className="text-white font-bold checked:text-primary-400">
                      ✔
                    </Text>
                  )}
                </TouchableOpacity>

                <Text className="flex-1 text-base text-[#6A6A6A]">
                  By creating an account you agree to our{" "}
                  <Text className="text-primary-400 font-bold border-b-2">
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(auth)/verification-register",
                  params: { phone: phoneNumber, dialCode: dialCode },
                })
              }
              className="bg-primary-400 py-3 rounded-2xl mt-8"
            >
              <Text className="text-white text-center font-bold text-lg">
                Sign up
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row justify-center mt-8">
              <Text className="text-[#6A6A6A]">Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-primary-400 font-semibold">Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#B0B1D7", "#00027D"]}
      style={styles.container}
      start={{ x: -0.9, y: -1.1 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex items-center justify-center ">
        <View className="flex items-center justify-center">
          <View className="items-center justify-center">
            <Image
              source={require("../assets/images/sentra-logo.png")}
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-center font-bold text-5xl">
            Sentra
          </Text>
          <View className="flex flex-col items-center justify-center text-justify text-white px-8">
            <Text className="text-white font-bold text-lg text-center">
              Meraba Finansial, Meraih Impian{" "}
            </Text>
            <Text className="font-normal text-sm text-center text-white">
              Solusi Kemandirian Finansial Terpadu bagi Tunanetra dan penyandang
              low vision berbasis aplikasi inklusif
            </Text>
          </View>
          <TouchableOpacity
            className="bg-white px-6 py-3 rounded-full mt-8"
            onPress={() => {
              router.push("/register");
            }}
          >
            <View className="flex flex-row items-center justify-center gap-x-2">
              <Image source={require("../assets/images/gmail.png")} />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2 text-[#676767]">
                Sign Up with No HP
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white px-6 py-3 rounded-full mt-4">
            <View className="flex flex-row items-center justify-center gap-x-2">
              <Image source={require("../assets/images/gmail.png")} />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2 text-[#676767]">
                Sign Up with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mt-6 text-white font-normal flex flex-row">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/login");
              }}
            >
              <Text className="text-white font-bold">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

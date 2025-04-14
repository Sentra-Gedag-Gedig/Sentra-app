import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "@/context/user-context";

const ConfirmKTP = () => {
  const params = useLocalSearchParams();
  const { user, setUser } = useUser();

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        >
          <View className="flex flex-col items-start justify-start w-full gap-y-2">
            <Text className="font-bold text-primary-400 text-2xl">
              Periksa ulang e-KTP
            </Text>
            <Text className="text-base">
              Pastiin foto e-KTP kamu udah jelas dan NIK, nama lengkap, serta
              tanggal lahir kamu sudah sesuai
            </Text>
        </View>
          <View className="flex items-center justify-center">
            {user?.ktp_photo ? (
              <Image
                source={{ uri: user.ktp_photo }}
                style={{ width: "100%", height: 200, borderColor: "#000", }}
                resizeMode="cover"
              />
            ) : (
              <Text className="text-lg text-red-500">
                Foto tidak ditemukan!
              </Text>
            )}
          </View>
          <View className="flex w-full">
            <View className="gap-y-2">
              <View className="gap-y-1">
                <Text className="font-bold text-xl">NIK</Text>
                <TextInput
                  secureTextEntry={true}
                  value=""
                  editable={false}
                  className="border border-[#CBCBCB] rounded-[10px] p-4"
                />
              </View>
              <View className="gap-y-1">
                <Text className="font-bold text-lg">
                  Nama lengkap sesuai e-KTP
                </Text>
                <TextInput
                  secureTextEntry={true}
                  value=""
                  editable={false}
                  className="border border-[#CBCBCB] rounded-[10px] p-4"
                />
              </View>
              <View className="gap-y-1">
                <Text className="font-bold text-lg">Tempat/Tgl Lahir</Text>
                <TextInput
                  secureTextEntry={true}
                  value=""
                  editable={false}
                  className="border border-[#CBCBCB] rounded-[10px] p-4"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(e-kyc)/verification-face",
                });
              }}
              className="bg-primary-400 py-4 rounded-2xl mt-8"
            >
              <Text className="text-white text-center font-bold text-2xl">
                Lanjut
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmKTP;

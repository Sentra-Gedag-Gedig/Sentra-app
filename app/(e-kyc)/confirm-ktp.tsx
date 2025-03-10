import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
type Props = {};

const ConfirmKTP = (props: Props) => {
  const { photoUri, photoBase64 } = useLocalSearchParams();
  const imageUri = Array.isArray(photoUri) ? photoUri[0] : photoUri;
  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
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
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                className="w-64 h-40 rounded-lg mt-2"
              />
            )}
          </View>
          <View className="flex w-full">
            <View className="gap-y-2">
              <View className="gap-y-1">
                <Text className="font-bold text-xl">NIK</Text>
                <TextInput
                  secureTextEntry={true}
                  className="border border-[#CBCBCB] rounded-[10px] p-4"
                />
              </View>
              <View className="gap-y-1">
                <Text className="font-bold text-lg">
                  Nama lengkap sesuai e-KTP
                </Text>
                <TextInput
                  secureTextEntry={true}
                  className="border border-[#CBCBCB] rounded-[10px] p-4"
                />
              </View>
              <View className="gap-y-1">
                <Text className="font-bold text-lg">Tempat/Tgl Lahir</Text>
                <TextInput
                  secureTextEntry={true}
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
              <Text className="text-white text-center font-bold text-lg">
                Kirim Kode
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmKTP;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const EditEmail = () => {
  const router = useRouter();
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = () => {
    if (!newEmail) return;

    router.push({
      pathname: "/(main)/profiles/verification-email",
      params: { email: newEmail },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6 flex-1 gap-y-4">
        <View className="gap-y-2">
          <Text className="text-sm font-semibold text-black mb-1">
            Email Terdaftar
          </Text>
          <TextInput
            className="bg-gray-200/40 rounded-xl p-4 text-gray-600"
            value="richardcen01@gmail.com"
            editable={false}
          />
        </View>

        <View className="gap-y-2">
          <Text className="text-sm font-semibold text-black mb-1">
            Email Baru
          </Text>
          <TextInput
            className="bg-gray-200/40 rounded-xl p-4 text-gray-600"
            placeholder="Contoh: richard@gmail.com"
            placeholderTextColor="#9CA3AF"
            value={newEmail}
            onChangeText={setNewEmail}
          />
        </View>

        <Text className="text-sm text-gray-400 text-center">
          Kode verifikasi akan dikirim ke email baru kamu
        </Text>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#00027D] py-4 rounded-full items-center"
        >
          <Text className="text-base font-bold text-white">Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditEmail;

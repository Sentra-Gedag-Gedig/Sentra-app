import { useUser } from "@/features/auth/hooks/use-user";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const EditPhone = () => {
  const [newPhone, setNewPhone] = useState("");
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const handleSubmit = () => {
    if (!newPhone) return;
    router.push({
      pathname: "/(main)/profiles/verification-hp",
      params: { phone: newPhone },
    });
  };
  const fullPhone = user?.phone_number || "";
  const phonePrefix = fullPhone.startsWith("62") ? "62" : fullPhone.slice(0, 2);
  const phoneNumber = fullPhone.startsWith("62")
    ? fullPhone.slice(2)
    : fullPhone.slice(phonePrefix.length);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6 flex-1 gap-y-4">
        <View>
          <Text className="text-sm font-semibold text-black mb-1">
            Nomor HP Terdaftar
          </Text>
          <View className="flex-row items-center bg-[#E8EAF6] rounded-xl overflow-hidden">
            <View className="bg-[#B0B1D7] px-4 py-2 justify-center items-center">
              <Text className="text-black text-base font-medium">{`+${phonePrefix}`}</Text>
            </View>
            <TextInput
              className="flex-1 px-4 py-2 text-base text-black"
              keyboardType="number-pad"
              value={phoneNumber}
              editable={false}
            />
          </View>
        </View>

        <View>
          <Text className="text-sm font-semibold text-black mb-1">
            Nomor HP baru
          </Text>
          <View className="flex-row items-center bg-[#E8EAF6] rounded-xl overflow-hidden">
            <View className="bg-[#000264] px-4 py-2 justify-center items-center">
              <Text className="text-white text-base font-medium">+62</Text>
            </View>
            <TextInput
              className="flex-1 px-4 py-2 text-base text-black"
              placeholder="Contoh: 8123456789"
              keyboardType="number-pad"
              placeholderTextColor="#888"
              value={newPhone}
              onChangeText={setNewPhone}
            />
          </View>
        </View>
        <Text className="text-sm text-gray-400 text-center">
          Pastiin nomor HP baru sudah terpasang di HP kamu
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

export default EditPhone;

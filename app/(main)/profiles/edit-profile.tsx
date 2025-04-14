import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import PhotoModal from "@/features/profiles/components/photo-modal";
import ConfirmPhoneModal from "@/features/profiles/components/confirm-phone-modal";

export const options = {
  tabBarStyle: { display: "none" },
};

export default function ProfileEdit() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("Tunanetra");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary-400 w-full h-full">
      <View className="items-center justify-center mt-16">
        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=11" }}
            className="w-24 h-24 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
          <Text className="text-white text-xl font-bold my-2">
            Ubah Foto Profil
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-full">
        <View className="bg-white rounded-t-3xl min-h-screen">
          <View className="mb-4 px-5 py-4">
            <Text className="text-gray-800 font-medium mb-2">Nama Lengkap</Text>
            <View className="bg-[#E6E6F2] rounded-xl px-4 py-3">
              <TextInput
                className="text-gray-800"
                value="Richard"
                editable={false}
              />
            </View>
          </View>
          <View className="w-full h-2 bg-black opacity-5"></View>
          <View className="px-5 py-2">
            <View className="flex-row items-center mb-2">
              <View className="flex-1">
                <Text className="text-black font-normal">Nomor HP</Text>
                <View className="rounded-xl py-2">
                  <Text className="font-bold">Belum Diisi</Text>
                </View>
              </View>
              <TouchableOpacity
                className="mt-6"
                onPress={() => setShowPhoneModal(true)}
              >
                <Text className="text-primary-400 font-bold">Ubah</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-2">
              <View className="flex-1">
                <Text className="text-black font-normal">Email</Text>
                <View className="rounded-xl py-2">
                  <Text className="font-bold">Richardcen05@Gmail.Com</Text>
                </View>
              </View>
              <TouchableOpacity className="ml-2 mt-6" onPress={() => {
                router.push("/(main)/profiles/edit-email")
              }}>
                <Text className="text-primary-400 font-bold">Ubah</Text>
              </TouchableOpacity>
            </View>

            <View className="h-0.5 bg-black opacity-5 mb-4" />

            <View className="mb-8">
              <Text className="text-black font-normal mb-2">Status Anda</Text>
              <View className="flex-row space-x-3 gap-x-6">
                {["Tunanetra", "Low Vision"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    className={`flex-1 py-1 rounded-xl border-2 ${
                      selectedStatus === status
                        ? "bg-primary-400 border-primary-400"
                        : "bg-white border border-blue-900"
                    }`}
                    onPress={() => setSelectedStatus(status)}
                  >
                    <Text
                      className={`text-center font-bold ${
                        selectedStatus === status
                          ? "text-white"
                          : "text-blue-900"
                      }`}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <PhotoModal
              visible={showPhotoModal}
              onClose={() => setShowPhotoModal(false)}
              onPickCamera={() => {
                setShowPhotoModal(false);
              }}
              onPickGallery={() => {
                setShowPhotoModal(false);
              }}
            />

            <ConfirmPhoneModal
              visible={showPhoneModal}
              onClose={() => setShowPhoneModal(false)}
              onConfirm={() => {
                router.push("/(main)/profiles/edit-phone")
                setShowPhoneModal(false);
              }}
            />

            <TouchableOpacity
              className="bg-primary-400 rounded-xl py-4"
              onPress={() => router.back()}
            >
              <Text className="text-white text-center font-bold text-lg">
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

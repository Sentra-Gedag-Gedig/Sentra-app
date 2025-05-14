import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { CreditCard, Lightbulb } from "lucide-react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useUser } from "@/context/user-context";

type Props = {};

const VerificationKTP = (props: Props) => {
  const { user, setUser } = useUser();
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      const parsed = Linking.parse(url);
      const status = parsed.queryParams?.status;

      const rawNama = parsed.queryParams?.nama;
      const rawNik = parsed.queryParams?.nik;
      const rawTanggalLahir = parsed.queryParams?.tanggal_lahir;
      const rawTempatLahir = parsed.queryParams?.tempat_lahir;
      const rawFotoKTP = parsed.queryParams?.foto_ktp;

      if (status === "verified") {
        const nama = Array.isArray(rawNama) ? rawNama[0] : rawNama || "";
        const nik = Array.isArray(rawNik) ? rawNik[0] : rawNik || "";
        const tanggalLahir = Array.isArray(rawTanggalLahir)
          ? rawTanggalLahir[0]
          : rawTanggalLahir || "";
        const tempatLahir = Array.isArray(rawTempatLahir)
          ? rawTempatLahir[0]
          : rawTempatLahir || "";
        const fotoKTP = Array.isArray(rawFotoKTP)
          ? rawFotoKTP[0]
          : rawFotoKTP || "";

        setUser({
          ...user,
          ktp_data: {
            nama,
            nik,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
          },
          ktp_photo: decodeURIComponent(fotoKTP),
        });
        router.push("/(e-kyc)/confirm-ktp");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mt-6 space-y-4">
        <ScrollView
          className="p-6 flex-grow flex-col"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="font-bold text-primary-400 text-2xl flex-1">
              Scan E-KTP Kamu
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(e-kyc)/verification-face")}
            >
              <Text className="text-primary-400 text-2xl font-bold">{` SKIP >`}</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2">
            <Text className="text-base">
              Biar kita lebih kenal, fotoin e-KTP kamu ya!
            </Text>
          </View>
          <View className="flex items-center justify-center">
            <Image
              source={require("@/assets/images/verification-ktp.png")}
              className="mt-2 "
              resizeMode="contain"
            />
          </View>
          <View className="border-4 border-primary-400 p-4 rounded-lg w-auto">
            <View className="flex flex-row items-center justify-center gap-x-3">
              <Lightbulb size={30} color="#00027d" strokeWidth={2} />
              <Text className="text-sm flex-1">
                Pastiin kamu ada di tempat terang
              </Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-x-3 mt-2">
              <CreditCard size={30} color="#00027d" strokeWidth={2} />
              <Text className="text-sm flex-1">
                Pastiin fisik e-KTP baik: gak lecek atau rusak dan tulisan bisa
                dibaca jelas
              </Text>
            </View>
          </View>
          <View className="flex flex-col mt-12 gap-y-4">
            <TouchableOpacity
              onPress={() => {
                const returnApp = Linking.createURL("status", {
                  queryParams: { status: "verified" },
                });

                const webUrl = `https://sentra-web-pi.vercel.app/ktp?returnApp=${encodeURIComponent(returnApp)}`;
                Linking.openURL(webUrl);
              }}
              className="bg-primary-400 items-center py-4 px-4 rounded-3xl"
            >
              <Text className="text-white font-bold text-2xl text-center">
                Lanjut
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary-400 items-center py-4 px-4 rounded-3xl"
              onPress={() => {
                router.push("/(e-kyc)/verification-face");
              }}
            >
              <Text className="text-white font-bold text-2xl text-center">
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VerificationKTP;

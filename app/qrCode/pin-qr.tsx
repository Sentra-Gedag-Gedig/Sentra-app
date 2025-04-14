import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import Dialpad from "@/components/Dialpad";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import QRSuccessModal from "@/features/qr/components/qr-success-modal";

type Props = {};

const PinQR = (props: Props) => {
  const [pin, setPin] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();
  const correctPin = "123456";

  const handlePress = (value: string | number) => {
    if (value === "del") {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 6) {
      const newPin = pin + value;
      setPin(newPin);

      if (newPin.length === 6) {
        if (newPin === correctPin) {
          setShowSuccessModal(true);
        } else {
          Alert.alert("PIN Salah", "Silakan coba lagi");
          setTimeout(() => setPin(""), 500);
        }
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full pt-12">
      <View className="flex-row items-center justify-center mt-12 py-2">
        <TouchableOpacity
          onPress={() => router.replace("/qrCode/scan-qr")}
          className="absolute left-4"
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-white text-lg font-bold">
            Memasukkan Kode PIN
          </Text>
        </View>
      </View>
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full  mx-auto">
        <ScrollView className="p-6 flex-grow">
          <View className="items-center mt-12 flex-1">
            <Text className="font-bold text-primary-400 text-4xl">
              Masukkan PIN
            </Text>
            <Text className="text-lg">Gunakan PIN Sentra Anda</Text>
            <View className="flex flex-row gap-4 my-6 gap-x-8">
              <PinDots pin={pin} length={6} />
            </View>
            <Dialpad handlePress={handlePress} />
          </View>
        </ScrollView>
      </View>
      <QRSuccessModal visible={showSuccessModal} />
    </SafeAreaView>
  );
};

export default PinQR;

const PinDots = ({ pin, length }: { pin: string; length: number }) => {
  return (
    <>
      {[...Array(length)].map((_, index) => {
        const isFilled = !!pin[index];
        return (
          <View
            key={index}
            className={`w-6 h-6 rounded-full border ${
              isFilled
                ? "bg-primary-400 border-primary-400"
                : "bg-gray-100 border-gray-100"
            }`}
          />
        );
      })}
    </>
  );
};

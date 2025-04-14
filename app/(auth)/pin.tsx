import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Dialpad from "@/components/Dialpad";
import { usePin } from "@/features/auth/hooks/use-pin";
import { PIN_LENGTH } from "@/features/auth/actions/pin";

const Pin = () => {
  const { pin, confirmPin, isFirstStep, currentStepIndex, handlePress } =
    usePin();

  const activePin = isFirstStep ? pin : confirmPin;

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full mt-6 mx-auto">
        <ScrollView className="p-6 flex-grow">
          <View className="items-center mt-12 flex-1">
            <Text className="font-bold text-primary-400 text-4xl">
              {isFirstStep ? "Masukkan PIN Anda" : "Konfirmasi PIN"}
            </Text>
            <View className="flex flex-row gap-4 my-6 gap-x-8">
              <PinDots pin={activePin} length={PIN_LENGTH} />
            </View>
            <Dialpad steps={currentStepIndex} handlePress={handlePress} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Pin;

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

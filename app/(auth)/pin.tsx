import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Dialpad from "@/components/Dialpad";
import useMultiStep from "@/hooks/use-multi-step";

const Pin = () => {
  const [pin, setPin] = useState<string>("");
  const [pinConfirmation, setPinConfirmation] = useState<string>("");
  const { currentStepIndex, next } = useMultiStep(2);

  const handlePress = (value: string | number) => {
    if (value === "del") {
      if (currentStepIndex === 0) {
        setPin((prev) => prev.slice(0, -1));
      } else {
        setPinConfirmation((prev) => prev.slice(0, -1));
      }
    } else {
      if (currentStepIndex === 0 && pin.length < 6) {
        setPin((prev) => prev + value);
      } else if (currentStepIndex === 1 && pinConfirmation.length < 6) {
        setPinConfirmation((prev) => prev + value);
      }
    }
  };

  useEffect(() => {
    if (pin.length === 6 && currentStepIndex === 0) {
      next();
    } else if (pinConfirmation.length === 6 && currentStepIndex === 1) {
      if (pin === pinConfirmation) {
        router.replace("/(auth)/login");
      } else {
        setPinConfirmation("");
      }
    }
  }, [pin, pinConfirmation, currentStepIndex]);

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border rounded-t-3xl rounded-lg w-full h-full mt-6 mx-auto">
        <ScrollView className="p-6 flex-grow">
          <View className="items-center mt-12 flex-1">
            <Text className="font-bold text-primary-400 text-4xl">
              {currentStepIndex === 0 ? "Masukkan PIN Anda" : "Konfirmasi PIN"}
            </Text>
            <View className="flex flex-row gap-4 my-6 gap-x-8">
              {[...Array(6)].map((_, index) => (
                <View
                  key={index}
                  className={`w-6 h-6 rounded-full border ${
                    (
                      currentStepIndex === 0
                        ? pin[index]
                        : pinConfirmation[index]
                    )
                      ? "bg-primary-400 border-primary-400"
                      : "bg-gray-100 border-gray-100"
                  }`}
                />
              ))}
            </View>
            <Dialpad steps={currentStepIndex} handlePress={handlePress} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Pin;

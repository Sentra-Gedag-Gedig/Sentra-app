import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBiometric } from "../hooks/use-biometric";

export default function Biometric() {

  const { handleBiometricLogin } = useBiometric();
  
  return (
    <View>
      <TouchableOpacity
        onPress={handleBiometricLogin}
        className="items-center my-6"
      >
        <Ionicons name="finger-print-sharp" size={50} color="#3629B7" />
      </TouchableOpacity>
    </View>
  );
}

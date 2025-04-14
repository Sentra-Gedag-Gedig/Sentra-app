import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const PasswordInput = ({
  placeholder = "Password",
  value,
  onChangeText,
  hasError = false,
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  hasError?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="relative mt-4">
      <TextInput
        className={`border ${hasError ? "border-red-500" : "border-[#CBCBCB]"} rounded-2xl pl-5 pr-12`}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Feather
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          color="#6A6A6A"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

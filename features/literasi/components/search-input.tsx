import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSearchPress: () => void;
  onVoicePress: () => void;
  placeholder?: string;
};

const SearchInput = ({
  value,
  onChangeText,
  onSearchPress,
  onVoicePress,
  placeholder = "Ketik kata kunci..",
}: Props) => {
  return (
    <View className="flex-row items-center border-2 border-primary-400 rounded-xl px-4">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        className="flex-1 text-base text-gray-900"
      />
      <TouchableOpacity onPress={onSearchPress} className="mx-2">
        <MaterialIcons name="search" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onVoicePress}>
        <MaterialIcons name="keyboard-voice" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

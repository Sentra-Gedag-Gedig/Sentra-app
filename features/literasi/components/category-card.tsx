import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  iconName: any;
  onPress: () => void;
  isActive?: boolean;
};

const CategoryCard = ({
  label,
  iconName,
  onPress,
  isActive = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-2 py-1 mr-2 mb-2 h-10 rounded-xl border ${
        isActive ? "bg-primary-400 border-primary-400" : "border-primary-400 bg-[#E6E6F2]"
      } flex-row items-center`}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={isActive ? "white" : "#00027d"}
      />
      <Text
        className={`ml-2 font-medium ${
          isActive ? "text-white" : "text-primary-900"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ProfileItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity className="flex-row items-center mb-5" onPress={onPress}>
      <View className="bg-primary-400 w-16 h-16 rounded-full items-center justify-center mr-4">
        {icon}
      </View>
      <Text className="text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileItem;

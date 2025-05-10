import { ActivityIndicator, View } from "react-native";
import React from "react";

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#00027D" />
    </View>
  );
}

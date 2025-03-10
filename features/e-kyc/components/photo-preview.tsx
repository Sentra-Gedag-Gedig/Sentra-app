import { View, Text } from "react-native";
import React from "react";
import { CameraCapturedPicture } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoPreview({
  photo,
  handleRetake,
}: {
  photo: CameraCapturedPicture;
  handleRetake: () => void;
}) {
  return (
    <SafeAreaView>
      <Text>CameraPreview</Text>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import { View, Text, Button} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const CameraKTP = () => {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center pb-2 text-lg">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View className="flex-1 h-full w-full relative">
      <CameraView
        style={{ backgroundColor: "", width: "100%", height: "100%", padding: 5 }}
        className="flex-1 w-full h-full"
        facing={facing}
      >
        <View className="absolute top-5 w-full p-5 gap-y-2">
          <Text className="text-white px-1 text-2xl font-bold text-center">
            Place your face inside the frame & follow instructions below
          </Text>
        </View>
        <View className="absolute left-10 top-40 w-5/6 h-[360px] border-4 border-[#B0B1D7] rounded-[360px] " />
      </CameraView>
    </View>
  );
};

export default CameraKTP;

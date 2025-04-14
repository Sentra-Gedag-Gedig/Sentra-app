import { Text, View } from "react-native";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <View className="flex-row items-center justify-center h-8 bg-[#F00] rounded-full mb-6 overflow-hidden">
      <View className="bg-[#0B2] h-full" style={{ width: `${progress}%` }}>
        <Text className="text-white text-center pt-1">{progress}%</Text>
      </View>
      <View className="bg-[#F00] h-full flex-1 items-center justify-center">
        <Text className="text-primary-400">Rp250.000</Text>
      </View>
    </View>
  );
}

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TABS } from "../utils/data";

export function FiltersTab({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (item: string) => void;
}) {
  const translateX = useSharedValue<number>(0);
  const [tabWidth, setTabWidth] = useState<number>(0);

  const handlePress = (index: number, item: string) => {
    setSelected(item);
    translateX.value = withTiming(index * tabWidth, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className="flex-row justify-between items-center py-2 bg-primary-200 rounded-2xl space-x-2"
      onLayout={(event) => {
        setTabWidth(event.nativeEvent.layout.width / TABS.length);
      }}
    >
      <Animated.View
        style={[animatedStyle, { width: tabWidth }]}
        className="absolute h-full bg-primary-400 rounded-2xl"
      />

      {TABS.map((item, index) => (
        <TouchableOpacity
          key={item}
          className="flex-1 items-center p-4"
          onPress={() => handlePress(index, item)}
        >
          <Text className={selected === item ? "text-white" : "text-gray-700"}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

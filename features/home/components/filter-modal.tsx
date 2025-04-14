import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  expenseCategories,
  incomeCategories,
} from "@/features/home/utils/data";
import Dialpad from "./dialpad-sentra-manager";

const TABS = [
  {
    key: "Pengeluaran",
    label: "Pengeluaran",
    icon: (color: string) => (
      <MaterialCommunityIcons name="cash-minus" size={28} color={color} />
    ),
  },
  {
    key: "Pemasukan",
    label: "Pemasukan",
    icon: (color: string) => (
      <FontAwesome5 name="hand-holding-usd" size={28} color={color} />
    ),
  },
];

export default function FilterModal({
  visible,
  toggle,
}: {
  visible: boolean;
  toggle: () => void;
}) {
  const [selected, setSelected] = useState("Pengeluaran");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const translateX = useSharedValue(0);

  const handleTabPress = useCallback(
    (index: number, type: string) => {
      setSelected(type);
      translateX.value = withTiming(index * buttonWidth, { duration: 300 });
    },
    [buttonWidth]
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const currentCategories = useMemo(
    () => (selected === "Pengeluaran" ? expenseCategories : incomeCategories),
    [selected]
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={toggle}
      statusBarTranslucent={true}
    >
      <SafeAreaView className="flex-1 mt-6 bg-white">
        <View className="flex-row justify-between items-center p-5 border-b border-gray-200">
          <TouchableOpacity onPress={toggle}>
            <MaterialCommunityIcons name="close" size={24} color="#00027d" />
          </TouchableOpacity>

          <View
            className="flex-row flex-1 mx-6 relative gap-x-2"
            onLayout={(e) => setButtonWidth(e.nativeEvent.layout.width / 2)}
          >
            <Animated.View
              style={[animatedIndicatorStyle, { width: buttonWidth }]}
              className="absolute h-full bg-[#00027d] rounded-2xl"
            />
            {TABS.map((tab, index) => {
              const isSelected = selected === tab.label;
              const iconColor = isSelected ? "#fff" : "#00027d";
              const textColor = isSelected ? "text-white" : "text-[#00027d]";
              return (
                <TouchableOpacity
                  key={tab.key}
                  className="flex-1 items-center justify-center p-3"
                  onPress={() => handleTabPress(index, tab.label)}
                >
                  <View className="flex-row items-center gap-x-2">
                    {tab.icon(iconColor)}
                    <Text className={`font-semibold ${textColor}`}>
                      {tab.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={toggle}>
            <MaterialCommunityIcons name="check" size={24} color="#00027d" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={currentCategories}
          keyExtractor={(item) => item.title}
          numColumns={4}
          initialNumToRender={8}
          maxToRenderPerBatch={12}
          removeClippedSubviews
          windowSize={5}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 12,
          }}
          renderItem={({ item }) => (
            <CategoryItem
              title={item.title}
              icon={item.icon}
              selected={selectedCategory === item.title}
              onPress={() => setSelectedCategory(item.title)}
            />
          )}
        />

        <MemoizedDialpad />
      </SafeAreaView>
    </Modal>
  );
}

const CategoryItem = memo(
  ({
    title,
    icon,
    selected,
    onPress,
  }: {
    title: string;
    icon: React.ReactNode;
    selected: boolean;
    onPress: () => void;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const bgColor = interpolateColor(
        selected ? 1 : 0,
        [0, 1],
        ["#ffffff", "#00027d"]
      );
      return {
        backgroundColor: bgColor,
        borderWidth: 2,
        borderColor: selected ? "#00027d" : "transparent",
        transform: [{ scale: withTiming(1) }],
      };
    });

    const iconColor = selected ? "#fff" : "#00027d";
    const textColor = selected ? "text-white" : "text-primary-400";

    return (
      <TouchableOpacity className="w-1/4" onPress={onPress}>
        <Animated.View
          style={animatedStyle}
          className="aspect-square rounded-2xl justify-center items-center gap-y-2"
        >
          {React.cloneElement(icon as React.ReactElement, { color: iconColor })}
          <Text className={`text-center text-sm font-medium ${textColor}`}>
            {title}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

const MemoizedDialpad = memo(Dialpad);

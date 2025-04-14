import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface EyeToggleSwitchProps {
  onToggle?: (value: boolean) => void;
  initialValue?: boolean;
  trackColor?: string;
  activeColor?: string;
  size?: number;
}

const EyeToggleSwitch: React.FC<EyeToggleSwitchProps> = ({
  onToggle,
  initialValue = false,
  trackColor = "#e0e0ff",
  activeColor = "#000080",
  size = 50,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const progress = useSharedValue(initialValue ? 1 : 0);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    progress.value = withTiming(newValue ? 1 : 0, {
      duration: 300,
    });

    if (onToggle) {
      onToggle(newValue);
    }
  };

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, size * 1]);

    return {
      transform: [{ translateX }],
      backgroundColor: isEnabled ? activeColor : "white",
    };
  });

  const dynamicStyles = {
    container: {
      width: size * 1.6,
      height: size * 0.6,
      borderRadius: size * 0.45,
    },
    circle: {
      width: size * 0.7,
      height: size * 0.7,
      borderRadius: size * 0.35,
    },
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <View
        style={[
          styles.container,
          dynamicStyles.container,
          { backgroundColor: trackColor },
        ]}
      >
        <Animated.View
          style={[styles.circle, dynamicStyles.circle, circleAnimatedStyle]}
        >
          {isEnabled ? (
            <Ionicons
              name="eye"
              size={size * 0.45}
              color="white"
              style={styles.icon}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={size * 0.45}
              color={activeColor}
              style={styles.icon}
            />
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#e0e0ff",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    alignSelf: "center",
  },
});

export default EyeToggleSwitch;

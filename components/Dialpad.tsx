import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  handlePress: (value: string | number) => void;
  steps: number;
};

const dialPad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const Dialpad = ({ steps, handlePress }: Props) => {
  return (
    <View className="flex items-center justify-center mt-4 bg-white">
      {dialPad.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row gap-8 mt-6">
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md shadow-current"
              onPress={() => handlePress(item)}
            >
              <Text className="text-2xl font-bold text-black">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View className="flex flex-row items-center w-72 mt-6">
        <View className="flex flex-row justify-between items-center w-full">
          <TouchableOpacity
            className="p-4"
            onPress={() => handlePress("fingerprint")}
            disabled={steps > 0}
          >
            <MaterialIcons className=""
              name="fingerprint"
              size={32}
              color={steps > 0 ? "white" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md shadow-current"
            onPress={() => handlePress(0)}
          >
            <Text className="text-2xl font-bold text-black">0</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4" onPress={() => handlePress("del")}>
            <MaterialIcons name="backspace" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dialpad;

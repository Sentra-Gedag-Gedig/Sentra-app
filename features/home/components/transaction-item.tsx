import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function TransactionItem({ transaction }: { transaction: any }) {
  return (
    <View className="bg-gray-100 rounded-2xl mb-4 mx-1">
      <View className="rounded-lg bg-primary-200 flex-row items-center justify-between py-2 px-3">
        <View className="flex-row gap-x-2 items-center">
          <AntDesign name="caretdown" size={10} color="#00027D" />
          <Text className="text-xs text-black">{transaction.date}</Text>
        </View>
        <Text className="text-black text-center font-normal text-xs">
          {transaction.type}: {transaction.amount}
        </Text>
      </View>
      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <View className="border rounded-lg bg-primary-400 p-2">
              {transaction.icon}
            </View>
            <View className="flex-col gap-y-1">
              <Text className="text-sm font-bold">{transaction.category}</Text>
              <Text className="text-xs text-gray-500">
                {transaction.description}
              </Text>
            </View>
          </View>
          <Text style={{ color: transaction.color }} className="font-bold">
            {transaction.type === "Pendapatan" ? "+" : "-"}
            {transaction.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}

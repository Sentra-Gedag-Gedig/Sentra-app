import { formatRupiah } from "@/lib/format-rupiah";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function TransactionSummary({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  return (
    <>
      <View className="flex items-center">
        <View className="flex-row items-center gap-x-1">
          <View className="border border-white rounded-sm">
            <Feather name="arrow-up-right" size={12} color="white" />
          </View>
          <Text className="text-white">Total Pemasukan</Text>
        </View>
        <Text className="text-[#00FF2F] text-2xl font-bold">
          {formatRupiah(totalIncome)}
        </Text>
      </View>

      <View className="h-14 w-px bg-white mx-4" />

      <View className="flex items-center justify-center">
        <View className="flex-row items-center gap-x-1">
          <View className="border border-white rounded-sm">
            <Feather name="arrow-down-right" size={12} color="white" />
          </View>
          <Text className="text-white">Total Pengeluaran</Text>
        </View>
        <Text className="text-[#FF0000] text-2xl font-bold">
          -{formatRupiah(totalExpense)}
        </Text>
      </View>
    </>
  );
}


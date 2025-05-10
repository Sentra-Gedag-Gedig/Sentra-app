import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Speech from "expo-speech";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TABS } from "@/features/home/utils/data";
import FilterModal from "@/features/home/components/filter-modal";
import { ProgressBar } from "@/features/home/components/progress-bar";
import { FiltersTab } from "@/features/home/components/filter-tab";
import { Header } from "@/features/home/components/header";
import { TransactionSummary } from "@/features/home/components/transaction-summary";
import { TransactionItem } from "@/features/home/components/transaction-item";
import { DateSelector } from "@/features/home/components/date-selector";
import { DialpadProvider } from "@/features/home/context/transaction-context";
import { useTransaction } from "@/features/home/hooks/use-transaction";
import { Loading } from "@/components/loading";
import ItemsModal from "@/features/home/components/items-modal";

export default function Home() {
  const [selected, setSelected] = useState<string>(TABS[0]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [itemsModalVisible, setItemsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { queryAll } = useTransaction();

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const toggleItemsModal = useCallback(() => {
    setItemsModalVisible((prev) => !prev);
  }, []);

  const speakTransactionSummary = () => {
    const totalIncome = calculateTotalIncome(queryAll.data?.transactions);
    const totalExpense = calculateTotalExpense(queryAll.data?.transactions);
    const totalBalance = totalIncome - totalExpense;

    Speech.speak(
      `Pendapatan anda ini adalah ${totalIncome} Rupiah, dengan pengeluaran anda adalah ${totalExpense} Rupiah, dengan sisa saldo anda adalah ${totalBalance} Rupiah`
    );
  };

  const calculateTotalIncome = (transactions: any[]) => {
    return (
      transactions?.reduce(
        (acc: number, transaction: any) =>
          transaction.type === "income" ? acc + transaction.nominal : acc,
        0
      ) || 0
    );
  };

  const calculateTotalExpense = (transactions: any[]) => {
    return (
      transactions?.reduce(
        (acc: number, transaction: any) =>
          transaction.type === "expense" ? acc + transaction.nominal : acc,
        0
      ) || 0
    );
  };

  const totalIncome = calculateTotalIncome(queryAll.data?.transactions);
  const totalExpense = calculateTotalExpense(queryAll.data?.transactions);
  const totalAmount = totalIncome + totalExpense;
  const progress = totalAmount ? (totalIncome / totalAmount) * 100 : 0;

  const handleTransactionPress = useCallback(
    (item: any) => {
      console.log("Transaction clicked:", JSON.stringify(item, null, 2));
      if (item && item.category) {
        setSelectedTransaction(item);
        toggleItemsModal();
      } else {
        console.log(
          "Data transaksi belum lengkap:",
          JSON.stringify(item, null, 2)
        );
      }
    },
    [toggleItemsModal]
  );

  return (
    <DialpadProvider>
      <SafeAreaView className="h-full w-full bg-primary-400 pt-8">
        <View className="px-6 pt-4 pb-2 leading-6 flex-col">
          <Header />
          <TouchableOpacity onPress={speakTransactionSummary}>
            <View className="items-center mx-4">
              <View className="mt-4 flex-row justify-between p-4 rounded-lg space-y-2">
                <TransactionSummary
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                />
              </View>
              <ProgressBar
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                progress={progress}
              />
              <DateSelector selectedFilter={selected} />
            </View>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-t-[60px] w-full h-full mt-6 flex-1">
          <View className="mx-6 mt-8">
            <FiltersTab selected={selected} setSelected={setSelected} />
          </View>
          {queryAll.isLoading ? (
            <View className="flex-1 justify-center items-center">
              <Loading />
            </View>
          ) : queryAll.error ? (
            <View className="flex-1 justify-center items-center">
              <Text>
                {queryAll.error.message || "Error loading transactions"}
              </Text>
            </View>
          ) : (
            <FlatList
              data={queryAll.data?.transactions || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleTransactionPress(item)}
                >
                  <TransactionItem transaction={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={{
                padding: 16,
                paddingBottom: 70,
              }}
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center">
                  <Text>No transactions found</Text>
                </View>
              }
            />
          )}
        </View>

        <TouchableOpacity
          onPress={toggleModal}
          className="absolute bottom-24 right-6 bg-white p-4 rounded-2xl shadow-2xl"
        >
          <MaterialCommunityIcons
            name="lead-pencil"
            size={28}
            color="#00027d"
          />
        </TouchableOpacity>

        <View className="bg-white">
          <FilterModal visible={isModalVisible} toggle={toggleModal} />
          <ItemsModal
            visible={itemsModalVisible}
            toggle={toggleItemsModal}
            transaction={selectedTransaction}
          />
        </View>
      </SafeAreaView>
    </DialpadProvider>
  );
}

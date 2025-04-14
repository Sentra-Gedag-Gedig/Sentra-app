import React, { useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TABS, transactions } from "@/features/home/utils/data";
import FilterModal from "@/features/home/components/filter-modal";
import { ProgressBar } from "@/features/home/components/progress-bar";
import { FiltersTab } from "@/features/home/components/filter-tab";
import { Header } from "@/features/home/components/header";
import { TransactionSummary } from "@/features/home/components/transaction-summary";
import { TransactionItem } from "@/features/home/components/transaction-item";
import { DateSelector } from "@/features/home/components/date-selector";

export default function Home() {
  const [progress, setProgress] = useState<number>(70);
  const [selected, setSelected] = useState<string>(TABS[0]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <SafeAreaView className="h-full w-full bg-primary-400 pt-8">
      <View className="px-6 pt-4 pb-2 leading-6 flex-col">
        <Header />
        <TouchableOpacity
          onPress={() => {
            Speech.speak(
              "Pendapatan anda [rentang minggu] ini adalah [Harganya] , dengan pengeluaran anda adalah [Harganya]"
            );
          }}
        >
          <View className="items-center mx-4">
            <View className="mt-4 flex-row justify-between p-4 rounded-lg space-y-2">
              <TransactionSummary />
            </View>
            <ProgressBar progress={progress} />
            <DateSelector selectedFilter={selected} />
          </View>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-t-[60px] w-full h-full mt-6 flex-1">
        <View className="mx-6 mt-8">
          <FiltersTab selected={selected} setSelected={setSelected} />
        </View>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 70,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={toggleModal}
        className="absolute bottom-24 right-6 bg-white p-4 rounded-2xl shadow-2xl"
      >
        <MaterialCommunityIcons name="lead-pencil" size={28} color="#00027d" />
      </TouchableOpacity>
      <View className="bg-white">
        <FilterModal visible={isModalVisible} toggle={toggleModal} />
      </View>
    </SafeAreaView>
  );
}

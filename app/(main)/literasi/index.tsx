"use client";

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchInput from "@/features/literasi/components/search-input";
import CategoryCard from "@/features/literasi/components/category-card";
import NewsCard from "@/features/literasi/components/news-card";
import HighlightNewsCard from "@/features/literasi/components/highlight-news-card";
import { categories, newsList } from "@/features/literasi/data/data";
import { useLiterasi } from "@/features/literasi/hooks/use-literasi";
import { literasiActions } from "@/features/literasi/actions/literasi";

const Literasi = () => {
  const {
    search,
    setSearch,
    selected,
    setSelected,
    latestNews,
    otherNews,
    handleSpeak,
    handleSearch,
    handleVoice,
  } = useLiterasi(newsList);

  const { handleNewsPress } = literasiActions();

  return (
    <SafeAreaView className="flex-1 bg-primary-400">
      <View className="flex-row items-center justify-between pt-12 mx-6 py-2">
        <Text className="text-white text-xl font-bold">Berita Finansial</Text>
        <AntDesign name="customerservice" size={32} color="white" />
      </View>

      <View className="bg-white flex-1 rounded-t-[40px] mt-2 px-4 pt-4 mb-10">
        <FlatList
          ListHeaderComponent={
            <>
              <View className="flex-row justify-center items-center mb-2">
                <SearchInput
                  value={search}
                  onChangeText={setSearch}
                  onSearchPress={handleSearch}
                  onVoicePress={handleVoice}
                  placeholder="Ketik kata kunci..."
                />
              </View>

              <Text className="text-start text-black font-bold mb-3 leading-6">
                Kategori Berita Saham
              </Text>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.label}
                renderItem={({ item }) => (
                  <CategoryCard
                    label={item.label}
                    iconName={item.iconName}
                    isActive={selected === item.label}
                    onPress={() => setSelected(item.label)}
                  />
                )}
                className="mb-4"
              />

              <Text className="text-start text-black font-bold mb-3 leading-6">
                Berita Terbaru
              </Text>
              <TouchableOpacity onPress={() => handleNewsPress(latestNews.id)}>
                <HighlightNewsCard
                  onPressAudio={() => handleSpeak(latestNews.title)}
                  news={latestNews}
                />
              </TouchableOpacity>
            </>
          }
          data={otherNews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNewsPress(item.id)}>
              <NewsCard
                imageUrl={item.imageUrl}
                title={item.title}
                source={item.source}
                time={item.time}
                onPressAudio={() => handleSpeak(item.title)}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Literasi;

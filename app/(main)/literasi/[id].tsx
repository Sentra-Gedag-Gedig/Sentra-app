import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { newsList } from "@/features/literasi/data/data";
import EyeToggleSwitch from "@/features/literasi/components/eye-switch";
import { useNewsDetail } from "@/features/literasi/hooks/use-news-detail";

const NewsDetail = () => {
  const { id } = useLocalSearchParams();
  const news = newsList.find((item) => item.id === id) || newsList[0];

  const {
    isPlaying,
    readingModeEnabled,
    highlightedParagraphs,
    toggleAudio,
    handleToggleReadingMode,
    toggleHighlight,
    paragraphs,
  } = useNewsDetail(news);

  return (
    <SafeAreaView className="flex-1 bg-primary-600 mb-16">
      <ScrollView className="flex-1 bg-white">
        <Image
          source={{ uri: news.imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-black mb-2">
            {news.title}
          </Text>
          <Text className="text-gray-500 text-sm mb-4">
            {news.date} - {news.time} WIB
          </Text>

          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center flex-1">
              <Image
                source={{
                  uri: news.authorImage || "https://via.placeholder.com/40",
                }}
                className="w-6 h-6 rounded-full mr-2"
              />
              <Text className="text-sm text-gray-700">{news.author}</Text>
            </View>

            <View className="flex-row items-center gap-x-4">
              <EyeToggleSwitch
                onToggle={handleToggleReadingMode}
                initialValue={readingModeEnabled}
                trackColor="#e0e0ff"
                activeColor="#000080"
                size={40}
              />
              <TouchableOpacity onPress={toggleAudio}>
                <Ionicons
                  name={isPlaying ? "pause" : "volume-high"}
                  size={32}
                  color="#00027d"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="mb-4">
          {paragraphs.map((paragraph: string, index: number) => {
            const isFirst = index === 0;
            const isHighlighted = highlightedParagraphs.includes(index);

            const textStyle = [
              "leading-6 mb-4 px-4",
              isHighlighted && readingModeEnabled
                ? "text-lg text-white bg-[#00027d] py-2"
                : "text-gray-800",
            ].join(" ");

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={readingModeEnabled ? 0.8 : 1}
                onPress={() => toggleHighlight(index)}
                disabled={!readingModeEnabled}
              >
                <Text
                  className={textStyle}
                  style={{ textAlign: "justify" }}
                  selectable={readingModeEnabled}
                >
                  {isFirst ? (
                    <>
                      <Text
                        className={`font-bold ${isHighlighted ? "text-white" : ""}`}
                      >
                        {news.source}.com -{" "}
                      </Text>
                      {paragraph.trim()}
                    </>
                  ) : (
                    paragraph.trim()
                  )}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetail;

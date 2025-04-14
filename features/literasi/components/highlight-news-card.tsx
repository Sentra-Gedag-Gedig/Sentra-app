import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NewsProps = {
  id: string;
  title: string;
  imageUrl: string;
  source: string;
  time: string;
  date?: string;
  author?: string;
  authorImage?: string;
};

type Props = {
  news: NewsProps;
  onPressAudio?: () => void;
};

const HighlightNewsCard = ({ news, onPressAudio }: Props) => {
  return (
    <View className="mb-6">
      <View className="relative">
        <Image
          source={{ uri: news.imageUrl }}
          className="w-full h-48 rounded-xl"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 rounded-b-xl">
          <Text className="text-white font-bold text-base" numberOfLines={2}>
            {news.title}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-white text-xs">
              {news.source}.com • {news.time} lalu
            </Text>
            <TouchableOpacity onPress={onPressAudio}>
              <Ionicons name="volume-high" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HighlightNewsCard;

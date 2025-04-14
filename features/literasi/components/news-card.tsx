import { View, Text, Image, TouchableOpacity } from "react-native"
import { Entypo, Ionicons } from "@expo/vector-icons"

type Props = {
  imageUrl: string
  title: string
  source: string
  time: string
  onPressAudio?: () => void
}

const NewsCard = ({ imageUrl, title, source, time, onPressAudio }: Props) => {
  return (
    <View className="border-b border-gray-200 py-3">
      <View className="flex-row items-center bg-white rounded-xl">
        <Image source={{ uri: imageUrl }} className="w-16 h-16 rounded-md mr-4" resizeMode="cover" />
        <View className="flex-1">
          <Text className="text-black font-medium text-sm mb-1" numberOfLines={2}>
            {title}
          </Text>
          <Text className="text-xs text-gray-500">
            {source}.com • {time} lalu
          </Text>
        </View>
        <TouchableOpacity className="ml-2 p-2" onPress={onPressAudio}>
          <Ionicons name="volume-high" size={32} color="#00027d" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NewsCard

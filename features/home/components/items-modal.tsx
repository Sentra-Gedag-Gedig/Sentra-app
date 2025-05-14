import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { getCategoryIcon } from "../actions/transaction";

type ItemsModalProps = {
  visible: boolean;
  toggle: () => void;
  transaction: any;
};

const ItemsModal = ({ visible, toggle, transaction }: ItemsModalProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [position, setPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  if (!transaction?.category && visible) {
    console.log("Data tidak lengkap, menutup modal");
    return null;
  }

  async function playSound() {
    console.log("Audio link:", transaction?.audio_link);
    if (transaction.audio_link) {
      try {
        if (sound) {
          if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            if (sound._loaded) {
              // Jika audio sudah selesai, langsung mulai dari awal
              if (position === totalDuration) {
                await sound.setPositionAsync(0); // Reset ke awal
              }
              await sound.playAsync();
              setIsPlaying(true);
            } else {
              console.log("Audio not loaded yet, waiting...");
              sound.loadAsync(
                { uri: transaction.audio_link },
                { shouldPlay: true }
              );
              setIsPlaying(true);
            }
          }
        } else {
          console.log("Loading Sound");
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: transaction.audio_link },
            { shouldPlay: true },
            onPlaybackStatusUpdate
          );
          setSound(newSound);
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  }

  // Reset audio when finished or when manually replaying
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
        setDuration("0:00"); // Resetting duration to 0
      }

      if (status.positionMillis) {
        setPosition(status.positionMillis);
      }

      if (status.durationMillis) {
        setTotalDuration(status.durationMillis);
      }

      const minutes = Math.floor(status.positionMillis / 60000);
      const seconds = ((status.positionMillis % 60000) / 1000).toFixed(0);
      setDuration(`${minutes}:${seconds.padStart(2, "0")}`);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (!visible && sound) {
      sound.pauseAsync();
      setIsPlaying(false);
      sound.unloadAsync();
      setDuration("0:00");
    }
  }, [visible, sound]);

  const icon = useMemo(() => {
    return transaction?.category
      ? getCategoryIcon(transaction.category, transaction.type)
      : null;
  }, [transaction]);

  const progressWidth = totalDuration ? (position / totalDuration) * 100 : 0;

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 rounded-3xl overflow-hidden">
          <View className="w-full flex-row justify-between p-4">
            <TouchableOpacity onPress={toggle}>
              <MaterialCommunityIcons name="close" size={24} color="#00027d" />
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="#000080"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color="#000080"
                />
              </TouchableOpacity>
            </View>
          </View>

          {transaction && (
            <View className="mx-4 pb-6">
              <View className="bg-primary-200 rounded-xl">
                <View className="p-6">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-primary-400 p-3 rounded-xl mr-2">
                      {icon && (
                        <View className="bg-primary-400 rounded-full">
                          {React.cloneElement(icon, {
                            color: "#fff",
                            size: 20,
                          })}
                        </View>
                      )}
                    </View>
                    <Text className="text-xl font-bold">
                      {transaction.category.charAt(0).toUpperCase() +
                        transaction.category.slice(1)}
                    </Text>
                  </View>

                  <Text
                    className={`text-2xl font-bold mb-2 ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "income" ? "" : "-"}Rp
                    {transaction.nominal.toLocaleString()}
                  </Text>

                  <View className="mb-4 flex-row items-center gap-x-1">
                    <Text className="text-gray-500">Tanggal:</Text>
                    <Text>
                      {new Date(transaction.created_at).toLocaleDateString(
                        "id-ID"
                      )}
                    </Text>
                  </View>

                  <View className="mb-4">
                    <Text className="text-gray-500">Catatan:</Text>
                    <Text>{transaction.description}</Text>
                  </View>

                  {transaction.audio_link && (
                    <View className="mb-4">
                      <Text className="text-gray-500 mb-2">Catatan Suara:</Text>
                      <View className="flex-row items-center rounded-full p-1">
                        <TouchableOpacity onPress={playSound}>
                          <FontAwesome
                            name={isPlaying ? "pause" : "play"}
                            size={20}
                            color="gray"
                          />
                        </TouchableOpacity>
                        <View className="flex-1 mx-3">
                          <View className="h-1 bg-gray-300 rounded-full overflow-hidden">
                            <View
                              className="h-full bg-indigo-900"
                              style={{ width: `${progressWidth}%` }}
                            />
                          </View>
                        </View>
                        <Text>{duration}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ItemsModal;

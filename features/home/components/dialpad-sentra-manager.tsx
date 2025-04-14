import React, { useState, useCallback, memo, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const dialPad = [
  ["clipboard", "Hari ini", "trash-can-outline", "check"],
  ["×", "7", "8", "9"],
  ["÷", "4", "5", "6"],
  ["−", "1", "2", "3"],
  ["＋", ".", "0", "close"],
];

const isNumberOrSymbol = (item: string) =>
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(item);

const Dialpad = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePress = useCallback((item: string) => {
    if (isNumberOrSymbol(item)) {
      setInputValue((prev) => prev + item);
    } else if (item === "close") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (item === "Hari ini") {
      setShowDatePicker(true);
    }
  }, []);

  const onChangeDate = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View className="bg-primary-400 rounded-t-2xl w-full p-4">
      <MicInputRow inputValue={inputValue} />

      {dialPad.map((row, index) => (
        <DialPadRow
          key={index}
          row={row}
          onPress={handlePress}
          selectedDate={selectedDate}
        />
      ))}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const DatePadComponent = ({
  selectedDate,
  onPress,
}: {
  selectedDate: Date;
  onPress: () => void;
}) => {
  const formattedDate = selectedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text className="text-black text-base font-bold">{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};
const DatePad = memo(DatePadComponent);

const renderButton = (
  item: string,
  selectedDate?: Date,
  onPress?: () => void
) => {
  switch (item) {
    case "clipboard":
      return (
        <Image
          source={require("@/assets/images/Note.png")}
          style={{ width: 24, height: 24 }}
        />
      );
    case "Hari ini":
      return <DatePad selectedDate={selectedDate!} onPress={onPress!} />;
    case "trash-can-outline":
      return <FontAwesome5 name="trash" size={24} color="black" />;
    case "check":
      return <FontAwesome name="check" size={24} color="green" />;
    case "close":
      return <FontAwesome name="close" size={24} color="red" />;
    case "voice":
      return <Ionicons name="mic" size={29} color="#00027d" />;
    default:
      return <Text className="text-black font-bold text-lg">{item}</Text>;
  }
};

const DialButtonComponent = ({
  item,
  onPress,
  selectedDate,
}: {
  item: string;
  onPress: (val: string) => void;
  selectedDate?: Date;
}) => {
  const isWhite = isNumberOrSymbol(item);
  const handlePress = () => onPress(item);

  return (
    <TouchableOpacity
      className={`flex-1 mx-1 rounded-3xl py-2 items-center justify-center ${
        isWhite ? "bg-white" : "bg-indigo-100"
      }`}
      onPress={handlePress}
    >
      {renderButton(item, selectedDate, handlePress)}
    </TouchableOpacity>
  );
};
const DialButton = memo(DialButtonComponent);

const DialPadRowComponent = ({
  row,
  onPress,
  selectedDate,
}: {
  row: string[];
  onPress: (val: string) => void;
  selectedDate?: Date;
}) => (
  <View className="flex-row justify-between mb-2">
    {row.map((item, index) => (
      <DialButton
        key={index}
        item={item}
        onPress={onPress}
        selectedDate={selectedDate}
      />
    ))}
  </View>
);
const DialPadRow = memo(DialPadRowComponent);

const MicInputRow = ({ inputValue }: { inputValue: string }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [showRecorderUI, setShowRecorderUI] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  async function startRecording() {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      console.log("Recording started", recording);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingDuration(0);
      setShowRecorderUI(true);

      const newInterval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      setIntervalId(newInterval);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      if (interval) {
        clearInterval(interval);
        setIntervalId(null);
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  }

  function onPlaybackStatusUpdate(status: any) {
    if (!status.isLoaded) {
      return;
    }

    setIsPlaying(status.isPlaying);
    setIsPaused(
      !status.isPlaying &&
        status.positionMillis > 0 &&
        status.durationMillis > status.positionMillis
    );

    if (status.didJustFinish) {
      setIsPlaying(false);
      setIsPaused(false);
    }
  }

  async function playSound() {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setIsPaused(true);
      }
      return;
    }

    try {
      if (interval) {
        clearInterval(interval);
        setIntervalId(null);
      }

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (recordingUri) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: recordingUri },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );

        setSound(newSound);
        setIsPlaying(true);
        setIsPaused(false);
      }
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  }

  function handleMicPress() {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }

  function discardRecording() {
    if (recording) {
      stopRecording();
    }
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    if (recordingUri) {
      FileSystem.deleteAsync(recordingUri, { idempotent: true }).catch((err) =>
        console.warn("Failed to delete file:", err)
      );
    }
    setRecordingUri(null);
    setIsRecording(false);
    setIsPaused(false);
    setIsSent(false);
    setIsPlaying(false);
    setRecordingDuration(0);
    setShowRecorderUI(false);
  }

  function sendRecording() {
    if (recording) {
      stopRecording();
    }

    console.log("Recording URI:", recordingUri);

    setIsRecording(false);
    setShowRecorderUI(false);
    if (recordingUri) {
      setIsSent(true);
    }
    // setRecordingUri(null);
  }
  function handleIconPress() {
    if (recordingUri && showRecorderUI) {
      // Hapus file rekaman
      discardRecording();
    } else {
      // Mulai/stop recording
      handleMicPress();
    }
  }

  function formatDuration(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <View className="flex-row items-center mb-4">
      {!showRecorderUI ? (
        <>
          <TouchableOpacity
            className="flex-1 mx-1 rounded-3xl py-2 items-center justify-center bg-indigo-100"
            onPress={handleIconPress}
          >
            {recordingUri ? (
              <Ionicons name="volume-high" size={24} color="#00027d" />
            ) : (
              <Ionicons name="mic" size={24} color="#00027d" />
            )}
          </TouchableOpacity>
          <View className="flex-[3] mx-1 bg-white p-3 rounded-xl flex-row items-center justify-between">
            <Text className="flex-1 text-gray-500 text-sm font-bold">
              Catatan
            </Text>
            <View className="flex-row items-center ml-2">
              <Text className="text-gray-500 text-xs mr-1">
                dalam Rupiah(RP)
              </Text>
            </View>
          </View>
        </>
      ) : (
        <VoiceRecorderUI
          isPaused={isPaused}
          isPlaying={isPlaying}
          duration={recordingDuration}
          isRecording={!!recording}
          onPlay={playSound}
          onTrash={discardRecording}
          onSend={sendRecording}
          formatDuration={formatDuration}
        />
      )}
    </View>
  );
};

const VoiceRecorderUI = ({
  isPaused,
  isPlaying,
  duration,
  isRecording,
  onPlay,
  onTrash,
  onSend,
  formatDuration,
}: {
  isPaused: boolean;
  isPlaying: boolean;
  duration: number;
  isRecording: boolean;
  onPlay: () => void;
  onTrash: () => void;
  onSend: () => void;
  formatDuration: (seconds: number) => string;
}) => {
  return (
    <View className="flex-1 bg-white rounded-xl p-4">
      <Text className="text-gray-600 font-bold text-xs mb-2">
        Catatan Suara:
      </Text>

      <View className="mb-2">
        <View className="h-6 bg-gray-100 rounded-full overflow-hidden">
          <View className="flex-row items-center">
            {isRecording && (
              <View className="h-6 w-2 bg-blue-500 animate-pulse" />
            )}
            <Text className="text-xs text-gray-500 ml-2">
              {formatDuration(duration)}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-around items-center">
        <TouchableOpacity onPress={onTrash}>
          <FontAwesome5 name="trash-alt" size={24} color="#00027d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlay}>
          <FontAwesome
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={32}
            color="#00027d"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSend}>
          <Ionicons name="send" size={24} color="#00027d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dialpad;

import { useState, useRef } from "react";
import * as Speech from "expo-speech";

export const useLiterasi = (newsList: any[]) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Semua");
  const isSpeakingRef = useRef(false);

  const latestNews = newsList[0];
  const otherNews = newsList.slice(1);

  const handleSpeak = (text: string) => {
    if (isSpeakingRef.current) {
      Speech.stop();
      isSpeakingRef.current = false;
    } else {
      Speech.speak(text, {
        onDone: () => {
          isSpeakingRef.current = false;
        },
        onStopped: () => {
          isSpeakingRef.current = false;
        },
      });
      isSpeakingRef.current = true;
    }
  };

  const handleSearch = () => {
    console.log("Search clicked:", search);
  };

  const handleVoice = () => {
    console.log("Voice input clicked");
  };

  return {
    search,
    setSearch,
    selected,
    setSelected,
    latestNews,
    otherNews,
    handleSpeak,
    handleSearch,
    handleVoice,
  };
};

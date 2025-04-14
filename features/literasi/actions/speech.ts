import * as Speech from "expo-speech";

export const speakText = (
  text: string,
  onDone: () => void,
  onStopped: () => void
) => {
  if (!text) return;

  Speech.stop();

  Speech.speak(text, {
    onDone,
    onStopped,
  });
};

export const stopSpeech = () => {
  Speech.stop();
};

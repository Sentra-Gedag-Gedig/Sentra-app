import * as Speech from "expo-speech";
import { DeteksiItem } from "../types/deteksi";

export const speakMessage = (message: string, beepEnabled = true) => {
  if (beepEnabled) {
    Speech.speak(message, {
      language: "id-ID",
      rate: 1.0,
      pitch: 1.0,
    });
  }
};

export const speakDetectionResults = (
  total: number,
  details: DeteksiItem[],
  beepEnabled = true
) => {
  if (!beepEnabled) return;

  let speechText = `Total uang yang terdeteksi adalah ${total} rupiah.`;

  if (details?.length) {
    const detailText = details
      .map((item) => `${item.nominal} rupiah uang ${item.jenis}`)
      .join(", ");
    speechText += ` Dengan rincian: ${detailText}.`;
  }

  speakMessage(speechText, true);
};

import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  playRecordingAsync,
  startRecordingAsync,
  stopRecordingAsync,
} from "../actions/audio";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recording) recording.stopAndUnloadAsync();
      if (sound) sound.unloadAsync();
      if (interval) clearInterval(interval);
    };
  }, []);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setDuration(0);
      const { interval } = await startRecordingAsync(
        () => setDuration((prev) => prev + 1),
        setRecording
      );
      setIntervalId(interval);
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    if (interval) clearInterval(interval);
    const uri = await stopRecordingAsync(recording);
    setRecording(null);
    setRecordingUri(uri);
    setIsRecording(false);
  };

  const play = async () => {
    if (!recordingUri) return;

    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    if (sound && isPaused) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    if (sound) await sound.unloadAsync();

    const newSound = await playRecordingAsync(recordingUri, (status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
        setIsPaused(false);
      }
    });

    setSound(newSound);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const discard = () => {
    if (interval) clearInterval(interval);
    if (sound) sound.unloadAsync();
    setRecording(null);
    setRecordingUri(null);
    setIsPlaying(false);
    setIsPaused(false);
    setDuration(0);
    setIsRecording(false);
  };

  return {
    recordingUri,
    isRecording,
    isPlaying,
    isPaused,
    duration,
    startRecording,
    stopRecording,
    play,
    discard,
  };
};

import { useEffect, useState, useRef } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export function useVoiceRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showRecorderUI, setShowRecorderUI] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
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
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      setShowRecorderUI(true);

      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;

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
  };

  const playSound = async () => {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setIsPaused(true);
      }
      return;
    }

    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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
  };

  const discardRecording = () => {
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
    setDuration(0);
    setShowRecorderUI(false);
  };

  const sendRecording = () => {
    if (recording) {
      stopRecording();
    }

    console.log("Recording URI:", recordingUri);

    setIsRecording(false);
    setShowRecorderUI(false);
    if (recordingUri) {
      setIsSent(true);
    }
  };

  const handleIconPress = () => {
    if (recordingUri && showRecorderUI) {
      discardRecording();
    } else {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    recordingUri,
    isRecording,
    isPlaying,
    isPaused,
    duration,
    showRecorderUI,
    isSent,
    startRecording,
    stopRecording,
    playSound,
    discardRecording,
    sendRecording,
    handleIconPress,
    formatDuration,
    setShowRecorderUI,
  };
}

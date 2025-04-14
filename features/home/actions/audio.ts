import { Audio } from "expo-av";

export async function startRecordingAsync(
  onDurationTick: (duration: number) => void,
  setRecording: (r: Audio.Recording) => void
): Promise<{ interval: NodeJS.Timeout }> {
  const permissionResponse = await Audio.requestPermissionsAsync();
  if (permissionResponse.status !== "granted") {
    throw new Error("Permission to access microphone is required!");
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );

  setRecording(recording);

  const interval = setInterval(() => {
    onDurationTick(1);
  }, 1000);

  return { interval };
}

export async function stopRecordingAsync(
  recording: Audio.Recording
): Promise<string | null> {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();

  await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  return uri;
}

export async function playRecordingAsync(
  uri: string,
  onPlaybackStatusUpdate: (status: any) => void
): Promise<Audio.Sound> {
  const { sound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: true },
    onPlaybackStatusUpdate
  );
  return sound;
}

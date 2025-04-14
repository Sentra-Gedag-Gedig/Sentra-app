import { Stack } from "expo-router";

export default function EKYCLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="verification-ktp"
        options={{ headerShown: true, title: "Verifikasi e-KTP" }}
      />
      <Stack.Screen
        name="camera-ktp"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="confirm-ktp"
        options={{ headerShown: true, title: "Verifikasi e-KTP" }}
      />
      <Stack.Screen
        name="verification-face"
        options={{ headerShown: true, title: "Verifikasi wajah" }}
      />
      <Stack.Screen
        name="camera-face"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="camera-face2"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
}

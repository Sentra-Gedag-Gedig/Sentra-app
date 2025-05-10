import { Stack } from "expo-router";

export default function EKYCLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="sentra-pay"
        options={{ headerShown: false, title: "Sentra Pay" }}
      />
      <Stack.Screen
        name="notification"
        options={{ headerShown: true, title: "Notifikasi" }}
      />
    </Stack>
  );
}

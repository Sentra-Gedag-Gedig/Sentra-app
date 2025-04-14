import { Stack } from "expo-router";

export default function DeteksiLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Profile" }}
      />
      <Stack.Screen
        name="deteksi-uang"
        options={{ headerShown: true, title: "Deteksi Uang Rupiah" }}
      />
    </Stack>
  );
}

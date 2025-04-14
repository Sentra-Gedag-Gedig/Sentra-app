import { Stack } from "expo-router";

export default function LiterasiLayout() {
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
        options={{ headerShown: false, title: "literasi" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Berita Finansial" }} />
    </Stack>
  );
}

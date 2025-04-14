import { Stack } from "expo-router";

export default function ProfileLayout() {
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
        name="edit-profile"
        options={{ headerShown: false, title: "Edit Profile" }}
      />
      <Stack.Screen
        name="edit-email"
        options={{ headerShown: true, title: "Ubah Email" }}
      />
      <Stack.Screen
        name="edit-phone"
        options={{ headerShown: true, title: "Ubah Nomor HP" }}
      />
      <Stack.Screen
        name="verification-email"
        options={{
          headerShown: true,
          title: "Verifikasi Email",
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="verification-hp"
        options={{
          headerShown: true,
          title: "Verifikasi HP",
          headerTitleAlign: "left",
        }}
      />
    </Stack>
  );
}

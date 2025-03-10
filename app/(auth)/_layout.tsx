import { Stack } from "expo-router";

export default function AuthLayout() {
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
        name="register"
        options={{ headerShown: true, title: "Sign up" }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ headerShown: true, title: "Lupa Kata Sandi" }}
      />
      <Stack.Screen
        name="verification-register"
        options={{
          headerShown: true,
          title: "Verifikasi Nomor",
        }}
      />
      <Stack.Screen
        name="verification-forgot-password"
        options={{
          headerShown: true,
          title: "Lupa Kata Sandi",
        }}
      />
      <Stack.Screen
        name="pin"
        options={{ headerShown: true, title: "Pembuatan Kode Pin" }}
      />
      <Stack.Screen
        name="reset-password"
        options={{ headerShown: true, title: "Reset Password" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: true, title: "Log in" }}
      />
    </Stack>
  );
}

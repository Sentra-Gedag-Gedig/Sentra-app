import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAccessToken = async (token: string, expiresAt: number) => {
  await AsyncStorage.setItem("accessToken", token);
  await AsyncStorage.setItem("expiresAt", expiresAt.toString());
};

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  const expiresAt = await AsyncStorage.getItem("expiresAt");

  if (!token || !expiresAt) return null;

  const now = Date.now();
  const expiry = parseInt(expiresAt);

  if (now >= expiry) {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("expiresAt");
    return null;
  }

  return token;
};

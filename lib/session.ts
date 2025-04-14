import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const TOKEN_EXPIRY_KEY = "token_expiry";

export async function setAuthSession(token: any, expiresInHours?: number) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, String(token));
  if (expiresInHours) {
    const expiryTime = Date.now() + expiresInHours * 60 * 60 * 1000;
    await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, expiryTime.toString());
  }
}

export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getTokenExpiry(): Promise<number | null> {
  const expiry = await SecureStore.getItemAsync(TOKEN_EXPIRY_KEY);
  return expiry ? parseInt(expiry) : null;
}

export async function clearSession() {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY),
  ]);
}

export async function isTokenValid(): Promise<boolean> {
  const [token, expiry] = await Promise.all([
    getAccessToken(),
    getTokenExpiry(),
  ]);
  return !!token && (!expiry || Date.now() < expiry);
}

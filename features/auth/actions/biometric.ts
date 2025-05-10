import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

export async function isBiometricAvailable(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && isEnrolled;
}

export async function authenticateWithBiometric(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync();
  return result.success;
}

export const getBiometricCredentials = async () => {
  const userId = await AsyncStorage.getItem("user_id"); 
  const password = await AsyncStorage.getItem("password");

  if (userId && password) {
    return { ID: userId, plain_text: password }; 
  }

  return null;
};

export const setBiometricCredentials = async (
  phone_number: string,
  password: string,
) => {
  await AsyncStorage.setItem("phone_number", phone_number);
  await AsyncStorage.setItem("password", password);
};

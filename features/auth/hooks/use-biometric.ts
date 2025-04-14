import { useState } from "react";
import { useRouter } from "expo-router";
import {
  isBiometricAvailable,
  authenticateWithBiometric,
  getBiometricCredentials,
} from "../actions/biometric";
import { LoginRequest } from "../types/auth";
import { getAccessToken, isTokenValid, setAuthSession } from "@/lib/session";
import { apiClient } from "@/lib/api/api-client";

export const useBiometric = () => {
  const [state, setState] = useState<LoginRequest>({
    phone_number: "",
    password: "",
  });
  const router = useRouter();

  const handleBiometricLogin = async () => {
    const available = await isBiometricAvailable();
    if (!available) return alert("Biometric is not available");

    const success = await authenticateWithBiometric();
    if (!success) return alert("Biometric failed");

    const valid = await isTokenValid();
    if (valid) {
      const token = await getAccessToken();
      if (token) {
        router.push("/(main)/home");
        return;
      }
    }

    const credentials = await getBiometricCredentials();
    if (!credentials) return alert("Biometric credentials not found");

    try {
      const response = await apiClient<{
        accessToken: string;
        expiresInHour: number;
      }>("/api/v1/auth/login-touch-id", "POST", {
        body: JSON.stringify(credentials),
      });
      const accessToken = response.accessToken;
      const expiresInHour = response.expiresInHour;

      await setAuthSession(accessToken, expiresInHour);
      router.push("/(main)/home");
    } catch (error) {
      alert("Biometric login failed");
    }
  };

  return {
    formLogin: state,
    handleBiometricLogin,
  };
};

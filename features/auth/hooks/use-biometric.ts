import { useState } from "react";
import { useRouter } from "expo-router";
import {
  isBiometricAvailable,
  authenticateWithBiometric,
  getBiometricCredentials,
} from "../actions/biometric";
import { LoginRequest } from "../types/auth";

export const useBiometric = () => {
  const [state, setState] = useState<LoginRequest>({ phone_number: "", password: "" });
  const router = useRouter();

  const handleBiometricLogin = async () => {
    const available = await isBiometricAvailable();

    if (!available) return alert("Biometric is not available on this device");

    const success = await authenticateWithBiometric();
    if (!success) return alert("Biometric failed");

    const credentials = await getBiometricCredentials();

    if (credentials) {
      setState(credentials);
    }

    router.push("/(e-kyc)/camera-face2");
  };

  return {
    formLogin: state,
    handleBiometricLogin,
  };
};

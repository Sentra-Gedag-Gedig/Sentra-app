import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";
import { login, register } from "../services/auth";
import { setAuthSession } from "@/lib/session";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async (res) => {
      await setAuthSession(res.accessToken, res.expiresInHour);
      router.replace("/(e-kyc)/verification-ktp");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: async (res) => {
      router.replace("/(auth)/verification-register");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (errors: Error) => {
      console.error("Register failed:", errors.message);
    },
  });
};

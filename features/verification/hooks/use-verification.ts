import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  VerificationNumberRequest,
  VerificationNumberResponse,
  VerifyUserRequest,
  VerifyUserResponse,
} from "../types/verification";
import { otpCheck, verificationNumber } from "../services/verification";

export const usePhoneVerification = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    VerificationNumberResponse,
    Error,
    VerificationNumberRequest
  >({
    mutationFn: (data: VerificationNumberRequest) => verificationNumber(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export const useOTPCheck = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<VerifyUserResponse, Error, VerifyUserRequest>({
    mutationFn: (data: VerifyUserRequest) => otpCheck(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.replace("/(auth)/login");
    },
    onError: (error: Error) => {
      router.replace("/(auth)/verification-register");
      console.error("Login failed:", error.message);
    },
  });
};

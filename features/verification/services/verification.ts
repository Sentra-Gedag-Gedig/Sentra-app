import { apiClient } from "@/lib/api/api-client";
import {
  VerificationNumberRequest,
  VerificationNumberResponse,
  VerifyUserRequest,
  VerifyUserResponse,
} from "../types/verification";

export const verificationNumber = (
  data: VerificationNumberRequest
): Promise<VerificationNumberResponse> => {
  console.log("verificationNumber called with:", data);
  return apiClient<VerificationNumberResponse>(
    "/api/v1/verification/phone-number-verification",
    "POST",
    {
      body: JSON.stringify(data),
    }
  );
};

export const otpCheck = (
  data: VerifyUserRequest
): Promise<VerifyUserResponse> => {
  console.log("otpCheck called with:", data);
  return apiClient<VerifyUserResponse>(
    "/api/v1/verification/verify-user",
    "PATCH",
    {
      body: JSON.stringify(data),
    }
  );
};

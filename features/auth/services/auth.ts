import { apiClient } from "@/lib/api/api-client";
import {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const res = await apiClient<LoginResponse>("/api/v1/auth/login", "POST", {
    body: JSON.stringify(body),
  });
  return res;
}

export async function register(
  body: RegisterRequest
): Promise<RegisterResponse> {
  console.log("Register called with:", body);
  const res = await apiClient<RegisterResponse>("/api/v1/users/", "POST", {
    body: JSON.stringify(body),
  });
  return res;
}

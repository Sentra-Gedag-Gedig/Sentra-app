import { apiClient } from "@/lib/api/api-client";
import { getAccessToken } from "@/lib/session";
import { jwtDecode } from "jwt-decode";

export async function getUserData() {
  const token = await getAccessToken();
  if (!token) throw new Error("No token found");

  const user = jwtDecode<any>(token);

  const res = await apiClient<any>(`/api/v1/users/${user.id}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
export async function updateUserProfile(data: FormData) {
  const token = await getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/users/profile-photo`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Upload gagal");
  }

  return await res.json();
}

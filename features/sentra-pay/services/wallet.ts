import { apiClient } from "@/lib/api/api-client";
import { getAccessToken } from "@/lib/session";

export async function getWallet(): Promise<any> {
  const token = await getAccessToken();

  const res = await apiClient<any>("/api/v1/wallet/balance", "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res", res);
  return res;
}

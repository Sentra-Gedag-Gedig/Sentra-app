import { apiClient } from "@/lib/api/api-client";
import { getAccessToken } from "@/lib/session";

export async function getAllBlogs(page = 1, limit = 10): Promise<any> {
  const token = await getAccessToken();

  const res = await apiClient<any>(
    `/api/v1/blogs?page=${page}&limit=${limit}`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function createTransaction(body: any): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(`/api/v1/blogs`, "POST", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });
  return res;
}

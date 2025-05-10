import { apiClient } from "@/lib/api/api-client";
import { Transaction as any } from "../types/transaction";
import { getAccessToken } from "@/lib/session";

export async function getTransactions(): Promise<any> {
  const token = await getAccessToken();

  const res = await apiClient<any>(
    "/api/v1/budget/transactions",
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function getTransactionsById(id: string): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/v1/budget/transactions/${id}`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function getTransactionsByPeriodWeek(
  Week: string
): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/budget/transactions/period/${Week}`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function getTransactionsByPeriodMonth(
  Month: string
): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/budget/transactions/period/${Month}`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function getTransactionsByTypeAndCategory(
  type: string,
  category: string
): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/budget/transactions/filter?type=${type}&category=${category}`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function updateTransaction(): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/v1/budget/transactions`,
    "PUT",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function deleteTransaction(id: string): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/v1/budget/transactions/${id}`,
    "DELETE",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}

export async function createTransaction(
  body: any
): Promise<any> {
  const token = await getAccessToken();
  const res = await apiClient<any>(
    `/api/v1/budget/transactions`,
    "POST",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }
  );
  return res;
}

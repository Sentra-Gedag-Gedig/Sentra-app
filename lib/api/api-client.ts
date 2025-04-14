export const apiClient = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  options: RequestInit = {}
): Promise<T> => {
  const config: RequestInit = {
    method,
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}${endpoint}`,
    config
  );

  const text = await response.text();
  console.log("Response:", text);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let message = text;
    if (contentType?.includes("application/json")) {
      try {
        const json = JSON.parse(text);
        message = json?.message || JSON.stringify(json);
      } catch (_) {}
    }
    throw new Error(message);
  }

  return text as unknown as T;
};

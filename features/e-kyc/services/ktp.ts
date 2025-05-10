export async function KTP({ photo }: { photo: any }): Promise<any> {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/ktp/extract`,
    {
      method: "POST",
      body: photo,
    }
  );
  console.log("Response status:", res.status);
  console.log("Response headers:", res.headers.get("content-type"));
  const text = await res.text();
  console.log("Response text:", text);

  if (!res.ok) {
    try {
      const error = JSON.parse(text);
      throw new Error(error?.message || "Upload failed");
    } catch {
      throw new Error("Upload failed: " + text);
    }
  }

  return JSON.parse(text);
}

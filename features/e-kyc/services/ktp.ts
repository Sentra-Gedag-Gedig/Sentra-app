export async function KTP(body: { uri: string }): Promise<any> {
  const uriSegments = body.uri.split("/");
  const fileName = uriSegments[uriSegments.length - 1];
  const fileType = fileName.split(".").pop();

  const formData = new FormData();
  formData.append("image", {
    uri: body.uri,
    name: fileName.trim(), 
    type: `image/${fileType}`,
  } as any);

  console.log("File name:", fileName);

  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/v1/ktp/extract`,
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    }
  );

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

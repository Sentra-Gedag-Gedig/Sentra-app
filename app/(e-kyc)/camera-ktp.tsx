import React, { Ref, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import { useUser } from "@/context/user-context";
import { useKTP } from "@/features/e-kyc/hooks/use-ktp";
import CameraPermission from "@/components/Permission";
import * as Speech from "expo-speech";

const CameraKTP = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const ref = useRef<CameraView>(null);
  const { user, setUser } = useUser();
  const { mutate: KTP, isPending } = useKTP();

  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://bf58-180-248-23-91.ngrok-free.app/api/v1/ktp/ws`
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleFrame = async (frame: any) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify(frame)); 
    }
  };

  CameraPermission();

  const takePicture = async () => {
    try {
      const photo = await ref.current?.takePictureAsync({
        quality: 1,
        base64: false,
        skipProcessing: true,
        exif: false,
      });
      if (photo?.uri) {
        setUser({
          ...user,
          ktp_photo: photo.uri,
        });
      }

      const formData = new FormData();
      formData.append("image", {
        uri: photo?.uri,
        name: "ktp.jpg",
        type: "image/jpeg",
      } as any);

      await KTP({ photo: formData });
      console.log(photo);
      console.log("KTP", photo?.uri);
    } catch (error) {
      console.error("Error taking picture:", error);
      if (socketRef.current?.readyState === WebSocket.OPEN) {
      }
    }
  };

  return (
    <View className="flex-1 h-full w-full relative">
      <CameraView
        ref={ref}
        style={{ width: "100%", height: "100%" }}
        className="flex-1 w-full h-full"
        facing={facing}
      >
        <View className="absolute top-10 w-full p-6 gap-y-2">
          <Text className="text-white text-3xl font-bold text-center">
            Ambil foto e-KTP
          </Text>
          <Text className="text-gray-300 text-xl text-center px-4">
            KTP anda terdeteksi di sebelah kiri kamera, arahkan kekiri dan
            majukkan hp nya sedikit!
          </Text>
        </View>
        <View className="absolute left-10 top-64 w-5/6 h-56 border-4 border-primary-400 rounded-xl">
          <View className="absolute top-12 left-60 w-20 h-28 border-2 border-primary-400 rounded-md" />
        </View>
        <TouchableOpacity
          onPress={takePicture}
          disabled={isPending}
          className={`absolute left-10 bottom-20 w-5/6 items-center py-4 px-4 rounded-2xl 
          ${isPending ? "bg-gray-400 opacity-70" : "bg-primary-400"}`}
        >
          <Text className="text-white font-bold text-2xl text-center">
            {isPending ? "Memproses..." : "Ambil Foto"}
          </Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

export default CameraKTP;

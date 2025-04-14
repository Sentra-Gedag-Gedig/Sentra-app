import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const CIRCLE_SIZE = screenWidth * 0.75;

const WEBSOCKET_URL = "wss://3.106.142.221";

const FaceRegistrationCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [wsStatus, setWsStatus] = useState("Disconnected");
  const [directionText, setDirectionText] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const router = useRouter();

  const cameraRef = useRef<CameraView>(null);
  const ws = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(WEBSOCKET_URL);
    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setWsStatus("Connected");
      ws.current?.send(
        JSON.stringify({ type: "INIT", message: "Client connected" })
      );
    };

    ws.current.onmessage = (event) => {
      console.log("Message received:", event.data);
      try {
        const message = JSON.parse(event.data);
        if (message.type === "face_aligned") {
          Speech.speak("Wajah terdeteksi dengan benar", {
            language: "id-ID",
            pitch: 1,
            rate: 1,
            onDone: () => {
              router.push("/(auth)/login");
            },
          });
        } else if (message.type === "direction") {
          if (message.text && message.text !== directionText) {
            setDirectionText(message.text);
            Speech.speak(message.text, {
              language: "id-ID",
              pitch: 1,
              rate: 1,
            });
          }
        }
      } catch (error) {
        console.error("Parsing error:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("Error");
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
      setWsStatus("Disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, [router]);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (permission?.granted && wsStatus === "Connected") {
      intervalRef.current = setInterval(captureAndSend, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [permission?.granted, wsStatus]);

  const captureAndSend = async () => {
    if (!cameraRef.current || ws.current?.readyState !== WebSocket.OPEN) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
        base64: true,
      });

      if (!photo || !photo.base64) return;
      console.log("Photo captured:", photo.uri);

      setCapturedImage(photo.uri);

      const payload = {
        type: "face_detection",
        data: {
          image: `data:image/jpeg;base64,${photo.base64}`,
          timestamp: Date.now(),
        },
      };

      ws.current.send(JSON.stringify(payload));
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const renderCameraContent = () => {
    return (
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Arahkan wajah anda ke lingkaran sesuai petunjuk dari server!
          </Text>
        </View>

        <View style={styles.circleContainer}>
          <View style={styles.circle} />
        </View>

        <View style={styles.directionContainer}>
          <Text style={styles.directionText}>{directionText}</Text>
          {wsStatus !== "Connected" && (
            <ActivityIndicator size="small" color="white" />
          )}
        </View>
      </CameraView>
    );
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Izin kamera diperlukan untuk fitur ini
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderCameraContent()}
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000264",
  },
  camera: {
    flex: 1,
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#000264",
  },
  instructionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "transparent",
  },
  directionContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000264",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
  },
  directionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  permissionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  previewContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});

export default FaceRegistrationCamera;

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
import * as FaceDetector from "expo-face-detector";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const CIRCLE_SIZE = screenWidth * 0.75;

const FaceRegistrationCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceAligned, setFaceAligned] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [mainInstruction, setMainInstruction] = useState(
    "Ikutin arahan suara untuk letakkan wajah anda tepat di Lingkaran!"
  );
  const [directionText, setDirectionText] = useState("");
  const [detectionInterval, setDetectionInterval] =
    useState<NodeJS.Timeout | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (permission?.granted && !detectionInterval) {
      const interval = setInterval(detectFace, 5000);
      setDetectionInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [permission?.granted]);

  useEffect(() => {
    return () => {
      if (detectionInterval) clearInterval(detectionInterval);
    };
  }, [detectionInterval]);

  const detectFace = async () => {
    if (analyzing || capturedImage || !cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
      });

      if (!photo) {
        return;
      }

      const options = {
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
      };

      const result = await FaceDetector.detectFacesAsync(photo.uri, options);

      if (result.faces.length === 0) {
        setFaceDetected(false);
        setFaceAligned(false);
        setDirectionText("");
        return;
      }

      const face = result.faces[0];
      processFacePosition(face);
    } catch (error) {
      console.error("Face detection error:", error);
    }
  };

  const processFacePosition = (face: any) => {
    const faceWidth = face.bounds.size.width;
    const faceHeight = face.bounds.size.height;
    const faceCenterX = face.bounds.origin.x + faceWidth / 2;
    const faceCenterY = face.bounds.origin.y + faceHeight / 2;

    const circleCenterX = screenWidth / 2;
    const circleCenterY = screenHeight * 0.4;

    const distance = Math.sqrt(
      Math.pow(faceCenterX - circleCenterX, 2) +
        Math.pow(faceCenterY - circleCenterY, 2)
    );

    const inCircle = distance < (CIRCLE_SIZE / 2) * 0.75;
    const goodSize =
      faceWidth > CIRCLE_SIZE * 0.5 && faceWidth < CIRCLE_SIZE * 0.85;

    setFaceDetected(true);

    const speak = async (text: string) => {
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) await Speech.stop();
      await Speech.speak(text, {
        language: "id-ID",
        pitch: 1,
        rate: 1,
      });
    };

    if (!inCircle) {
      const xDiff = faceCenterX - circleCenterX;
      const yDiff = faceCenterY - circleCenterY;

      let newDirection = "";

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        newDirection =
          xDiff > 0
            ? "Arahkan kepala anda ke Kiri"
            : "Arahkan kepala anda ke Kanan";
      } else {
        newDirection =
          yDiff > 0
            ? "Arahkan kepala anda ke Atas"
            : "Arahkan kepala anda ke Bawah";
      }

      if (newDirection !== directionText) {
        setDirectionText(newDirection);
        speak(newDirection);
      }
    } else if (!goodSize) {
      let newDirection =
        faceWidth < CIRCLE_SIZE * 0.5
          ? "Dekatkan wajah anda"
          : "Jauhkan wajah anda";

      if (newDirection !== directionText) {
        setDirectionText(newDirection);
        speak(newDirection);
      }
    } else {
      const newDirection = "Wajah terdeteksi dengan baik";
      if (newDirection !== directionText) {
        setDirectionText(newDirection);
        speak(newDirection);
      }
      setFaceAligned(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !capturedImage) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: true,
        });
        if (!photo) {
          return;
        }

        setCapturedImage(photo.uri);
        setDirectionText("Wajah teregistrasi!");
        setAnalyzing(false);

        console.log("Photo taken:", photo.uri);
      } catch (error) {
        console.error("Failed to take picture:", error);
        setAnalyzing(false);
        setDirectionText("Gagal mengambil gambar");

        const interval = setInterval(detectFace, 5000);
        setDetectionInterval(interval);
      }
    }
  };

  const renderCameraContent = () => {
    if (capturedImage) {
      return (
        <View style={styles.capturedContainer}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          <View style={styles.capturedOverlay}>
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CD964" />
            </View>
          </View>
        </View>
      );
    }

    return (
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>{mainInstruction}</Text>
        </View>

        <View style={styles.circleContainer}>
          <View
            style={[
              styles.circle,
              faceAligned
                ? styles.circleAligned
                : faceDetected
                  ? styles.circleDetected
                  : {},
            ]}
          />
        </View>

        <View style={styles.directionContainer}>
          <Text style={styles.directionText}>{directionText}</Text>
          {analyzing && (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator size="small" color="white" />
              <Text style={styles.analyzingText}>Analyzing...</Text>
            </View>
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

  return <View style={styles.container}>{renderCameraContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000264",
  },
  camera: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#000264",
  },
  backButton: {
    padding: 5,
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
    overflow: "hidden",
  },
  circleDetected: {
    borderColor: "#FFCC00",
  },
  circleAligned: {
    borderColor: "#4CD964",
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
  capturedContainer: {
    flex: 1,
    position: "relative",
  },
  capturedImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  capturedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  analyzingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  analyzingText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
});

export default FaceRegistrationCamera;

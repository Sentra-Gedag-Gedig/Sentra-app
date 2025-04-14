import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { OtpStyles } from "@/features/verification/styles/otp.styles";
import { useRouter } from "expo-router";
import { formatTime } from "@/features/verification/utils/otp-format-time";
import { useUser } from "@/context/user-context";
import { usePhoneVerification } from "@/features/verification/hooks/use-verification";

const Verification = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { mutate: verification } = usePhoneVerification();

  const { user, setUser } = useUser();

  useEffect(() => {
    if (timer > 0) {
      const sendTimer = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(sendTimer);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    await verification({
      phone_number: user?.phone_number,
    });
    console.log("Resend OTP to:", user?.phone_number);
    if (canResend) {
      setCanResend(false);
      setTimer(30);
    }
  };

  useEffect(() => {
    if (code.length === 5) {
      setUser({
        ...user,
        code: code,
      });
      console.log("User code:", code);
      router.push("/(auth)/pin");
    }
  }, [code]);

  const onSubmit = async () => {};

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView className="p-6 flex-grow">
          <View className="flex flex-col items-start justify-start w-full">
            <Text
              accessibilityLabel="Tap me!"
              accessible={true}
              className="font-bold text-primary-400 text-2xl"
            >
              Masukkan Kode
            </Text>
            <Text className="text-sm">
              Kami telah mengirimkan chat whatsapp dengan kode aktivasi kepada
              nomor anda +{user?.phone_number}
            </Text>
          </View>

          <OtpInput
            focusColor="black"
            numberOfDigits={5}
            onTextChange={setCode}
            theme={{
              containerStyle: isError
                ? OtpStyles.errorContainer
                : OtpStyles.container,
              pinCodeContainerStyle: isError
                ? OtpStyles.errorPinCodeContainer
                : OtpStyles.pinCodeContainer,
              pinCodeTextStyle: isError
                ? OtpStyles.errorPinCodeText
                : OtpStyles.pinCodeText,
              focusedPinCodeContainerStyle: isError
                ? OtpStyles.errorPinCodeContainer
                : OtpStyles.focusedPinCodeContainer,
            }}
          />

          <View className="flex justify-end flex-row mb-4">
            {canResend ? (
              <>
                <Text className="text-gray-500">Tidak menerima kode? </Text>
                <TouchableOpacity onPress={handleResend}>
                  <Text className="text-primary-500 font-bold">Resend</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text className="font-bold">
                Kirim Kode Lagi
                <Text className="text-primary-500 font-bold">
                  {" "}
                  {formatTime(timer)}
                </Text>
              </Text>
            )}
          </View>

          {isError && (
            <Text style={OtpStyles.errorText}>
              Kode salah, mohon coba lagi!
            </Text>
          )}

          <TouchableOpacity
            className="bg-primary-400 items-center py-4 px-4 rounded-2xl mt-8 mx-2"
            onPress={onSubmit}
          >
            <Text className="text-white font-bold text-lg">Verifikasi OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

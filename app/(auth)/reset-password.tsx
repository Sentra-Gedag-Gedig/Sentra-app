import {
  Text,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  resetPasswordFormSchema,
  resetPasswordFormValues,
} from "@/features/auth/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/PasswordInput";

export default function ResetPassword() {
  const { width, height } = useWindowDimensions();
  const { phone, dialCode } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<resetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: resetPasswordFormValues) => {
    console.log("Submitted data:", data);
  };

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mt-6">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
          <View className="flex flex-col items-start justify-start w-full">
            <Text className="font-bold text-primary-400 text-2xl">
              Reset password
            </Text>
            <Text className="text-sm">
              Please type something you’ll remember
            </Text>
          </View>

          <View
            className="flex items-center justify-center"
            style={{
              marginTop: height > 600 ? 40 : 10,
            }}
          >
            <Image
              source={require("@/assets/images/ResetPassword.png")}
              className="mt-2"
            />
          </View>

          <View className="gap-y-2 w-full">
            <Text>New password</Text>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <Text className="text-red-500 text-sm">
                {errors.newPassword.message}
              </Text>
            )}

            <Text>Confirm new password</Text>
            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.confirmNewPassword}
                />
              )}
            />
            {errors.confirmNewPassword && (
              <Text className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-primary-400 py-4 rounded-2xl mt-8"
            >
              <Text className="text-white text-center font-bold text-xl">
                Reset password
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row justify-center mt-8">
              <Text className="text-[#6A6A6A]">Have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-[#3629B7] font-semibold ml-1">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

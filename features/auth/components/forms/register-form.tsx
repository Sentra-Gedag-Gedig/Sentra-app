import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import CountrySelect from "../country-select";
import { RegisterRequest } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { RegisterSchema } from "../../schemas/auth";
import { useRouter } from "expo-router";
import { useRegister } from "../../hooks/use-auth";
import PasswordInput from "@/components/PasswordInput";
import { useUser } from "@/context/user-context";
import { usePhoneVerification } from "@/features/verification/hooks/use-verification";
import * as SecureStore from "expo-secure-store";

const RegisterForm = () => {
  const [checked, setChecked] = useState(false);
  const [dialCode, setDialCode] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  const { mutateAsync: register, isPending } = useRegister();
  const { mutateAsync: verification } = usePhoneVerification();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: "",
      phone_number: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterRequest): Promise<void> => {
    const cleanDialCode = dialCode.replace("+", "");
    const fullPhoneNumber = cleanDialCode + data.phone_number;

    console.log("Full phone number:", fullPhoneNumber);

    const payload = {
      name: data.name,
      password: data.password,
      phone_number: fullPhoneNumber,
    };
    setUser(payload);
    console.log("Payload:", payload);
    await SecureStore.setItemAsync("user_name", payload.name!);

    await verification({ phone_number: payload.phone_number });
    await register(payload);
  };

  return (
    <View className="space-y-2 mx-auto">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Your Name"
            value={value}
            onChangeText={onChange}
            className={`border ${errors.name ? "border-red-500" : "border-[#CBCBCB]"} flex-1 rounded-2xl mt-4 pl-5`}
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500 pl-1">{errors.name.message}</Text>
      )}

      <View className="flex flex-row gap-x-2 items-center">
        <CountrySelect
          onSelect={(code) => {
            setDialCode(code);
            setValue("country", code);
          }}
        />
        <Controller
          control={control}
          name="phone_number"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              className={`border ${errors.phone_number ? "border-red-500" : "border-[#CBCBCB]"} flex-1 rounded-2xl mt-4 pl-5`}
            />
          )}
        />
      </View>
      {errors.phone_number && (
        <Text className="text-red-500 pl-1">{errors.phone_number.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            onChangeText={onChange}
            hasError={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 pl-1">{errors.password.message}</Text>
      )}

      <View className="flex flex-row items-center mt-6 mx-auto">
        <View className="flex flex-row flex-wrap items-center flex-1">
          <TouchableOpacity
            className={`w-9 h-9 border border-[#CBCBCB] flex-shrink-0 rounded-md mr-2 justify-center items-center ${
              checked ? "border-primary-400" : ""
            }`}
            onPress={() => setChecked(!checked)}
          >
            {checked && (
              <Text className="text-white font-bold checked:text-primary-400">
                ✔
              </Text>
            )}
          </TouchableOpacity>

          <Text className="flex-1 text-base text-[#6A6A6A]">
            By creating an account you agree to our{" "}
            <Text className="text-primary-400 font-bold border-b-2">
              Terms and Conditions
            </Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-primary-400 py-3 rounded-2xl mt-8"
      >
        <Text className="text-white text-center font-bold text-lg">
          Sign up
        </Text>
      </TouchableOpacity>

      <View className="flex flex-row justify-center mt-8">
        <Text className="text-[#6A6A6A]">Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-primary-400 font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

import { useState } from "react";
import useMultiStep from "@/hooks/use-multi-step";
import {
  createInitialPinState,
  updatePinState,
  isPinComplete,
} from "../actions/pin";
import { PinState } from "../types/pin";
import { useUser } from "@/context/user-context";
import { useOTPCheck } from "@/features/verification/hooks/use-verification";

export const usePin = () => {
  const [state, setState] = useState<PinState>(createInitialPinState());
  const { currentStepIndex, next } = useMultiStep(2);
  const { user } = useUser();
  const { mutateAsync: checkOTP } = useOTPCheck();

  const isFirstStep = currentStepIndex === 0;

  const handlePress = (value: string | number) => {
    const updated = updatePinState(value, {
      ...state,
      currentStepIndex,
    });

    setState(updated);

    if (isFirstStep && isPinComplete(updated.pin)) {
      next();
    } else if (!isFirstStep && isPinComplete(updated.confirmPin)) {
      if (updated.pin === updated.confirmPin) {
        checkOTP({
          phone_number: user?.phone_number,
          personal_identification_number: updated.pin,
          code: user?.code,
        });
      } else {
        setState((prev) => ({ ...prev, confirmPin: "" }));
      }
    }
  };

  return {
    pin: state.pin,
    confirmPin: state.confirmPin,
    isFirstStep,
    currentStepIndex,
    handlePress,
  };
};

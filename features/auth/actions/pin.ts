import { PinState } from "../types/pin";

export const PIN_LENGTH = 6;

export function createInitialPinState(): PinState {
  return {
    pin: "",
    confirmPin: "",
    currentStepIndex: 0,
  };
}

export function updatePinState(
  value: string | number,
  state: PinState
): PinState {
  const isFirstStep = state.currentStepIndex === 0;

  if (value === "del") {
    return {
      ...state,
      pin: isFirstStep ? state.pin.slice(0, -1) : state.pin,
      confirmPin: !isFirstStep
        ? state.confirmPin.slice(0, -1)
        : state.confirmPin,
    };
  }

  if (isFirstStep && state.pin.length < PIN_LENGTH) {
    return { ...state, pin: state.pin + value };
  } else if (!isFirstStep && state.confirmPin.length < PIN_LENGTH) {
    return { ...state, confirmPin: state.confirmPin + value };
  }

  return state;
}

export function isPinComplete(pin: string) {
  return pin.length === 6;
}

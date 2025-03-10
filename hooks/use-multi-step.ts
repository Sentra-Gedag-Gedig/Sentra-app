import { useState } from "react";

type UseMultiStepFormReturn = {
  currentStepIndex: number;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
};

const useMultiStep = (steps: number): UseMultiStepFormReturn => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((i) => (i < steps - 1 ? i + 1 : i));
  };

  const back = () => {
    setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < steps) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStepIndex,
    next,
    back,
    goTo,
  };
};

export default useMultiStep;

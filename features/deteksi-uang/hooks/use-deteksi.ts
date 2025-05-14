import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Deteksi } from "../services/deteksi";

export const useDeteksi = (onSuccessCallback?: (data: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => Deteksi(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["money"] });
      onSuccessCallback?.(res); 
    },
    onError: (error: Error) => {
      console.error("Money Detection Failed:", error.message);
    },
  });
};

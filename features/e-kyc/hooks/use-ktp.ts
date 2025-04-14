import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KTP } from "../services/ktp";

export const useKTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => KTP(data),
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      return res;
    },
    onError: (error: Error) => {
      console.error("KTP extraction failed:", error.message);
    },
  });
};

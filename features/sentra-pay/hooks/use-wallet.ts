import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWallet } from "../services/wallet";

export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};

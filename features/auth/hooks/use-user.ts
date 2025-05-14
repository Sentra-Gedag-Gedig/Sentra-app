import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserProfile } from "../services/user";

export function useUser() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5,
    initialData: () => queryClient.getQueryData(["user"]),
  });
}

export function useUpdateProfilePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

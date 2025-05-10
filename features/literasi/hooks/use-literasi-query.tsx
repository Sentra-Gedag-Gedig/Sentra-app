import { useMutation, useQuery } from "@tanstack/react-query";
import { createTransaction, getAllBlogs } from "../services/literasi";

export const useLiterasiQuery = () => {
  const queryLiterasi = (page = 1, limit = 10) =>
    useQuery({
      queryKey: ["literasi", page, limit],
      queryFn: () => getAllBlogs(page, limit),
    });

  const mutationCreateLiterasi = useMutation({
    mutationFn: createTransaction,
  });

  return {
    queryLiterasi,
    mutationCreateLiterasi,
  };
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions,
  getTransactionsById,
  getTransactionsByPeriodMonth,
  getTransactionsByPeriodWeek,
  getTransactionsByTypeAndCategory,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transaction";
import { Transaction } from "../types/transaction";

export const useTransaction = () => {
  const queryClient = useQueryClient();

  const queryAll = useQuery<any>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const queryById = (id: string) =>
    useQuery<Transaction>({
      queryKey: ["transaction", id],
      queryFn: () => getTransactionsById(id),
      enabled: !!id,
    });

  const queryByMonth = (month: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "month", month],
      queryFn: () => getTransactionsByPeriodMonth(month),
      enabled: !!month,
    });

  const queryByWeek = (week: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "week", week],
      queryFn: () => getTransactionsByPeriodWeek(week),
      enabled: !!week,
    });

  const queryByTypeAndCategory = (type: string, category: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "filter", type, category],
      queryFn: () => getTransactionsByTypeAndCategory(type, category),
      enabled: !!type && !!category,
    });

  const mutationCreate = useMutation<any, Error, FormData>({
    mutationFn: (data) => createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTransaction,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousData = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old) =>
        old?.filter((tx) => tx.id !== id)
      );

      return { previousData };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["transactions"], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const refetchAll = () =>
    queryClient.invalidateQueries({ queryKey: ["transactions"] });

  const prefetchAll = () =>
    queryClient.prefetchQuery({
      queryKey: ["transactions"],
      queryFn: getTransactions,
    });

  return {
    queryAll,
    queryById,
    queryByMonth,
    queryByWeek,
    queryByTypeAndCategory,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    refetchAll,
    prefetchAll,
  };
};

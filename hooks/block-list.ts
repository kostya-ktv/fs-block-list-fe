import {
  BlockListDTO,
  blockListControllerCreateBlockListItem,
  blockListControllerGetBlockList,
  blockListControllerRemoveBlockListItem,
} from "@/lib/api/generated";
import { QueryKeys } from "@/providers/query.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBlockList = () => {
  return useQuery({
    queryKey: [QueryKeys.blockList],
    queryFn: async () => await blockListControllerGetBlockList(),
  });
};

export const useDeleteBlocklistItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blockListControllerRemoveBlockListItem,
    onSuccess: (_, variables) => {
      queryClient.setQueryData([QueryKeys.blockList], (prev: BlockListDTO) => {
        const res = { ...prev };
        res.items = prev.items.filter((el) => el.id !== variables?.params?.id);
        return res;
      });
    },
  });

  return (itemId: number) => {
    mutation.mutate({ params: { id: itemId } });
  };
};
export const useAddBlocklistItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blockListControllerCreateBlockListItem,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.blockList], (prev: BlockListDTO) => {
        const res = { ...prev };
        res.items = [data, ...prev.items];
        return res;
      });
    },
  });

  return mutation.mutate;
};

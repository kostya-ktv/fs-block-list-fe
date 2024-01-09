import {
  BlockListDTO,
  blockListControllerCreateBlockListItem,
  blockListControllerGetBlockList,
  blockListControllerRemoveBlockListItem,
} from "@/lib/api/generated";
import { QueryKeyGeneric, QueryKeys } from "@/providers/query.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBlockList = (searchValue?: string) => {
  let key = QueryKeyGeneric("blockList", searchValue);

  return useQuery({
    queryKey: [key],
    queryFn: async () =>
      await blockListControllerGetBlockList({ q: searchValue }),
  });
};

export const useDeleteBlocklistItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blockListControllerRemoveBlockListItem,
    onSuccess: async (_, variables) => {
      const itemID = variables?.params?.id;
      queryClient.setQueryData([QueryKeys.blockList], (prev: BlockListDTO) => {
        const res = { ...prev };
        res.items = prev.items.filter((el) => el.id !== itemID);
        return res;
      });
      if (itemID) {
        let key = QueryKeyGeneric("blockList", itemID);
        await queryClient.invalidateQueries({ queryKey: [key] });
      }
    },
  });

  return async (itemId: number) => {
    await mutation.mutateAsync({ params: { id: itemId } });
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
  return { mutation };
};

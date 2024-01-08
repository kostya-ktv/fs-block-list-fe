import { BlockListItem } from "@/components/pages/block-list/block-list-item";
import { Skeleton } from "@/components/ui";
import { useBlockList } from "@/hooks";

export const BlockList = () => {
  const { data, isLoading } = useBlockList();
  if (isLoading) return <Skeleton className="w-full rounded-full h-10" />;
  return (
    <div className="flex flex-col gap-y-3">
      <h2>ID: {data?.id}</h2>
      <div className="flex flex-col gap-y-3">
        {data?.items.map((item) => <BlockListItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

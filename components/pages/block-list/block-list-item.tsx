import { BlockListItemDTO } from "@/lib/api/generated";

export const BlockListItem: React.FC<{ item: BlockListItemDTO }> = ({
  item,
}) => {
  return <div>{item.createdAt}</div>;
};

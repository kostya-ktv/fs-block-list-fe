import { useDeleteBlocklistItem } from "@/hooks";
import { BlockListItemDTO } from "@/lib/api/generated";
import { TrashIcon } from "@radix-ui/react-icons";

interface Props {
  item: BlockListItemDTO;
  onDelete?: Function;
}
export const BlockListItem: React.FC<Props> = ({ item, onDelete }) => {
  const deleteItem = useDeleteBlocklistItem();
  return (
    <div className="grid grid-cols-[30px_100px_100px_1fr_30px] mb-2 items-center border p-3 rounded-lg ">
      <div>{item.id}.</div>
      <div>{new Date(item.createdAt).toLocaleString()}</div>
      <div>{item.type}</div>
      <div>{item.data}</div>

      <TrashIcon
        onClick={async () => {
          await deleteItem(item.id).then(() => {
            onDelete && onDelete();
          });
        }}
        className="h-6 w-6 cursor-pointer bg-neutral-800 p-[2px] text-white rounded-full"
      />
    </div>
  );
};

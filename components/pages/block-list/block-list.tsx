"use client";
import { AddBlockItem } from "@/components/pages/block-list/add-block-item";
import { BlockListItem } from "@/components/pages/block-list/block-list-item";
import { Input, Skeleton } from "@/components/ui";
import { useBlockList, useDebouncedState } from "@/hooks";
import { useState } from "react";

export const BlockList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebouncedState(searchValue, 500);
  const { data, isLoading, refetch } = useBlockList(debouncedValue);

  return (
    <div className="flex flex-wrap">
      <div className="flex flex-col basis-[400px]">
        <h2>ID: {data?.id}</h2>
        <AddBlockItem />
      </div>
      <div className="flex flex-col flex-1 gap-y-3">
        <span>Total found: {data?.items.length}</span>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
        {isLoading && <Skeleton className="w-full rounded-full h-10" />}

        {data?.items.map((item) => (
          <BlockListItem onDelete={refetch} key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

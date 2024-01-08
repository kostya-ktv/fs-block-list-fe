"use client";
import { AccountSubMenu } from "@/components/shared/main-layout/main-header/blocking-menu/account-sub-menu";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSession } from "@/hooks";
import { ROUTES } from "@/lib/routes";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const BlockingMenuBar = () => {
  const { isError } = useSession();
  const router = useRouter();
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex gap-x-2 items-center">
        <LockClosedIcon />
        <span>Blocking</span>
      </MenubarTrigger>
      <MenubarContent>
        <AccountSubMenu disabled={isError} />
        <MenubarSeparator />
        <MenubarItem onClick={() => router.push(ROUTES.blockList)}>
          Block List
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

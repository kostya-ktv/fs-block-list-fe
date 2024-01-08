"use client";
import { AccountSubMenu } from "@/components/shared/main-layout/main-header/account-sub-menu";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSession } from "@/hooks";
import { authControllerSignOut } from "@/lib/api/generated";
import { ROUTES } from "@/lib/routes";
import { QueryKeys } from "@/providers/query.provider";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const UserMenuBar = () => {
  const { isError } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await authControllerSignOut().then(async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.session],
      });
    });
  };
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex gap-x-2 items-center">
        <AvatarIcon />
        <p>User</p>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem
          disabled={isError}
          onClick={() => router.push(ROUTES.sessionInfo)}
        >
          Session
        </MenubarItem>

        <AccountSubMenu disabled={isError} />
        <MenubarSeparator />
        <MenubarItem disabled={isError} onClick={() => handleLogout()}>
          Logout
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

"use client";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { authControllerSignOut } from "@/lib/api/generated";
import { ROUTES } from "@/lib/routes";
import { QueryKeys } from "@/providers/query.provider";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const UserMenuBar = () => {
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
        <span>User</span>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => router.push(ROUTES.sessionInfo)}>
          Session
        </MenubarItem>

        <MenubarSeparator />
        <MenubarItem onClick={() => handleLogout()}>Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

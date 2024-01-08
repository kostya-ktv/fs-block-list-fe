"use client";
import { UserMenuBar } from "@/components/shared/main-layout/main-header/user-menu-bar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ROUTES } from "@/lib/routes";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const MainHeader = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center">
      <Menubar>
        <UserMenuBar />
        <MenubarMenu>
          <MenubarTrigger className="flex gap-x-2 items-center">
            <DashboardIcon />
            <p>Go</p>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => router.push(ROUTES.home)}>
              Go to Home
            </MenubarItem>

            <MenubarItem onClick={() => router.push(ROUTES.signUp)}>
              Go to Register
            </MenubarItem>

            <MenubarItem onClick={() => router.push(ROUTES.signIn)}>
              Go to Login
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

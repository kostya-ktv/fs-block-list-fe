"use client";
import { BlockingMenuBar } from "@/components/shared/main-layout/main-header/blocking-menu/blocking-menu";
import { UserMenuBar } from "@/components/shared/main-layout/main-header/user-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSession } from "@/hooks";
import { ROUTES } from "@/lib/routes";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const MainHeader = () => {
  const router = useRouter();
  const { isError } = useSession();
  return (
    <header className="flex justify-between items-center">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="flex gap-x-2 items-center">
            <DashboardIcon />
            <span>Go</span>
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

        {!isError && (
          <>
            <UserMenuBar />
            <BlockingMenuBar />
          </>
        )}
      </Menubar>
    </header>
  );
};

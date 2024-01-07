import { MainHeader } from "@/components/shared/main-layout/main-header";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="
    w-screen
    h-screen
    overflow-hidden
    overflow-y-auto
    flex
    flex-col
    gap-y-4
    p-5
    "
    >
      <MainHeader />
      <main className="relative flex flex-col">{children}</main>
    </div>
  );
};

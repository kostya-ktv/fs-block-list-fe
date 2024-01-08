import { MainHeader } from "@/components/shared/main-layout/main-header/main-header";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main
      className="
    w-screen
    h-screen
    overflow-hidden
    overflow-y-auto
    flex
    flex-col
    gap-y-3
    p-4
    "
    >
      <MainHeader />
      <div className="relative flex flex-col h-full">{children}</div>
    </main>
  );
};

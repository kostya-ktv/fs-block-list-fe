import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app.provider";
import { MainLayout } from "@/components/shared";

const PoppinsF = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Block list",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={PoppinsF.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </AppProvider>
    </html>
  );
}

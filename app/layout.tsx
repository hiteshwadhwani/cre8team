import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/hooks/use-user";
import ModalProvider from "@/providers/modal-provider";

const font = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={font.className}>
          <Toaster />
          <Navbar />
          <ModalProvider />
          {children}
        </body>
      </UserContextProvider>
    </html>
  );
}

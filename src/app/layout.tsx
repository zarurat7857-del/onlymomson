import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Shell from "@/components/layout/Shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "onlymomson",
  description: "Trending stories, images and videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black min-h-screen flex`}>
        <Shell>
            {children}
        </Shell>
      </body>
    </html>
  );
}
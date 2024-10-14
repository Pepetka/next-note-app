import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { StyledComponentsRegistry } from "../components/StyledComponentRegistry";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToDo app",
  description: "ToDo list management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

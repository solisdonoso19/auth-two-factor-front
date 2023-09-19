import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidential Dashboard",
  description: "Auth tow factor demostration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

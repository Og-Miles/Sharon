import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Sharon Day",
  description: "Hearty birthday wishes for my beautiful princess Sharon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

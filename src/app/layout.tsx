import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Kitchen Builder",
  description: "Interactive 3D kitchen layout editor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

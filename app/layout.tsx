import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Orbital Atlas — A living map of our solar system",
  description: "Explore our neighborhood in space.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

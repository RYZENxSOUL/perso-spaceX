import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Cosmyth — A Living Map of the Cosmos",
  description: "Explore our neighborhood in space, deep cosmos, celestial mechanics, and mind-bending theories in an interactive 3D universe.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

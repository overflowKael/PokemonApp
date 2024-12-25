import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui";
export function generateMetadata(): Metadata {
  return {
    title: "Pokemon App",
    description: "App to search pokemons",
    keywords: "pokemon, app, search, pokemons",
    viewport: "width=device-width, initial-scale=1",
  };
}

// Componente que usa NextUIProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className="dark h-full w-full" suppressHydrationWarning>
      <body className=" w-full">
          <Navbar />
          {children}
      </body>
    </html>
  );
}
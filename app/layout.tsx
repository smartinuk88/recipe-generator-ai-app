import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recipe Generator App",
  description: "An AI-powered recipe generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Toaster />
          <main className="flex-1">
          {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

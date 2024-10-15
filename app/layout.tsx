import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recipe Generator App",
  description: "An AI-powered recipe generator",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { [key: string]: string };
}>) {
  const pathname = params?.slug || "";

  // Exclude Header on sign-in and sign-up pages
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen h-screen overflow-hidden flex flex-col">
          <Toaster />
          {!isAuthRoute && <Header />}
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

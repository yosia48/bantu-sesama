import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BantuSesama - Platform Donasi Transparan Indonesia",
  description:
    "Platform bantuan transparan yang mempertemukan orang baik dengan yang membutuhkan. Donasi langsung, tanpa perantara.",
  keywords: [
    "donasi",
    "bantuan",
    "transparan",
    "Indonesia",
    "crowdfunding",
    "amal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

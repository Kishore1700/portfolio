import type { Metadata } from "next";
import "./globals.css";
import { SwarmBuilderProvider } from "@/context/SwarmBuilderContext";
import { SwarmOverlay } from "@/components/SwarmOverlay";
import { FloatingHud } from "@/components/FloatingHud";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "KISHORE. // Autonomous Systems & Multi-Agent Canvas",
  description:
    "Kishore P M — Principal Creative Technologist & Full-Stack Architect. Dark brutalist multi-agent autonomous swarm portfolio.",
  keywords: ["Kishore", "Kishore P M", "Software Architect", "Full-Stack", "Multi-Agent Swarm", "Autonomous Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050505] text-[#FAFAFA] font-sans antialiased selection:bg-[#DC2626] selection:text-white relative min-h-screen bg-atmospheric bg-micro-grid">
        <SwarmBuilderProvider>
          <Navbar />
          <SwarmOverlay />
          <main className="relative z-10">{children}</main>
          <FloatingHud />
        </SwarmBuilderProvider>
      </body>
    </html>
  );
}

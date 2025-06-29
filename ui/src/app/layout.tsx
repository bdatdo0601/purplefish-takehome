import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PurpleFish Pre-Screening Agent",
  description: "Job finding tool for agent",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("next-url") as string;
  console.log(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
          <div className="p-4 border-2 rounded-lg m-2 h-15 flex-shrink-0 text-right">
            <div className="flex items-center justify-end gap-2">
              <Link href="/">For Pre-Screening</Link>
              <span>|</span>
              <Link href="/candidates">For Hiring Manager</Link>
            </div>
          </div>
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-4 border-2 rounded-lg m-2 flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

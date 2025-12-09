import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Louis Braidwood",
  description: "Louis Braidwood's game, software and web development portfolio",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} font-sans antialiased bg-slate-900 text-slate-200`}>
      {children}
      </body>
      </html>
  );
}

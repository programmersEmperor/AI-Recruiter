import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "AI Recruiter",
  description: "AI Recruiter Voice Agent that can create job interviews and conduct them using voice! Perfect for HR tech, recruitment automation, and AI enthusiasts! 💼✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

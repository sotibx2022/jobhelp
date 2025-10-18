import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";
import AbsoluteComponent from "./_components/absoluteComponents/AbsoluteComponent";
import AuthWrapper from "./_components/wrappers/AuthWrapper";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "JobRise | Career Planning & Job Search Support",
  description:
    "Enter a job role to instantly fetch or generate its profile, responsibilities, checklist, roadmap, and related job postings.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthWrapper>
        <ProviderWrapper>
          <body className={`${inter.variable} antialiased`}>
            <AbsoluteComponent />
            {children}
          </body>
        </ProviderWrapper>
      </AuthWrapper>
    </html>
  );
}

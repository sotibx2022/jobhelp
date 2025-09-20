import { CommonFooter, PagesHeader,AppSidebar } from "@/app/_components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "My Next.js App",
    description: "A modern web app built with Next.js",
    keywords: ["Next.js", "React", "TypeScript"],
    authors: [{ name: "Your Name" }],
    viewport: "width=device-width, initial-scale=1",
};
interface RootLayoutProps {
    children: React.ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <main className="container">
            <SidebarProvider>
            <AppSidebar/>
           <main>
             <PagesHeader />
            {children}
            <CommonFooter />
           </main>
            </SidebarProvider>
        </main>
    );
};
export default RootLayout;

import { CommonFooter, PagesHeader, AppSidebar } from "@/app/_components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="container">
                <SidebarProvider>
                    <AppSidebar />
                    <main className="pagesContent">
                        <PagesHeader />
                        <div className="childrenPages">{children}</div>
                        <CommonFooter />
                    </main>
                </SidebarProvider>
            </main>
        </>
    );
};
export default RootLayout;

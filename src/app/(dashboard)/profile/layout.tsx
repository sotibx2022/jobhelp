import { CommonFooter, PagesHeader, AppSidebar } from "@/app/_components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
                        <div className="childrenPages">
                            <div className="trigger sm:hidden">
                                <SidebarTrigger/>
                            </div>
                            {children}
                            </div>
                        <CommonFooter />
                    </main>
                </SidebarProvider>
            </main>
        </>
    );
};
export default RootLayout;

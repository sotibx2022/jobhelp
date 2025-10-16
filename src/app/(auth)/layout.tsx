import { CommonFooter, PagesHeader, AppSidebar } from "@/app/_components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
import AbsoluteComponent from "../_components/absoluteComponents/AbsoluteComponent";
const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <main className="container">
                <PagesHeader />
                <div className="childrenPages">{children}</div>
                <CommonFooter />
                <AbsoluteComponent/>
            </main>
        </>
    );
};
export default RootLayout;

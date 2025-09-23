import { CommonFooter, PagesHeader,AppSidebar } from "@/app/_components";
import { SidebarProvider} from "@/components/ui/sidebar";
interface RootLayoutProps {
    children: React.ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <main className="container">
            <SidebarProvider>
            <AppSidebar/>
           <main className="pagesContent">
             <PagesHeader />
            <div className="childrenPages">{children}</div>
            <CommonFooter />
           </main>
            </SidebarProvider>
        </main>
    );
};
export default RootLayout;

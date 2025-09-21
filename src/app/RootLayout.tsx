"use client"
import QueryProvider from "@/provider/QueryProvider";
interface RootLayoutProps {
    children: React.ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
};
export default RootLayout;

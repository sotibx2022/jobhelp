"use client"
import QueryProvider from "./provider/QueryProvider";
interface RootLayoutProps {
    children: React.ReactNode;
}
const ProviderWrapper = ({ children }: RootLayoutProps) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
};
export default ProviderWrapper;

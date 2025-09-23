"use client"
import { Provider } from "react-redux";
import QueryProvider from "./provider/QueryProvider";
import { store } from "./redux/store";
interface RootLayoutProps {
    children: React.ReactNode;
}
const ProviderWrapper = ({ children }: RootLayoutProps) => {
    return (
        <Provider store={store}>
            <QueryProvider>
                {children}
            </QueryProvider>
        </Provider>
    );
};
export default ProviderWrapper;

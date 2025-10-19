"use client"
import { Provider } from "react-redux";
import QueryProvider from "./provider/QueryProvider";
import { store } from "./redux/store";
import DisplayProvider from "./context/DisplayComponent";
import AuthWrapper from "./_components/wrappers/AuthWrapper";
interface RootLayoutProps {
    children: React.ReactNode;
}
const ProviderWrapper = ({ children }: RootLayoutProps) => {
    return (
        <Provider store={store}>
            <QueryProvider>
                <DisplayProvider>
                {children}
                </DisplayProvider>
            </QueryProvider>
        </Provider>
    );
};
export default ProviderWrapper;

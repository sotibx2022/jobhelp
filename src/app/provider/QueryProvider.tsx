"use client";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { headers } from "next/headers";
import React, { ReactNode, useState, useEffect } from "react";
const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000, // 5 minutes
                        gcTime: 30 * 60 * 1000,   // 30 minutes
                    },
                },
            })
    );
    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["country"],
            queryFn: async () => {
                try {
                    const response = await axios.get("https://ipapi.co/json/");
                    return response.data.country_name;
                } catch {
                    return "United States";
                }
            },
        });
    }, [queryClient]);
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
};
export default QueryProvider;

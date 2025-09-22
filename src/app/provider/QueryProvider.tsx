"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode, useState } from 'react'
const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 30 * 60 * 1000,
            },
        },
    }))
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
export default QueryProvider
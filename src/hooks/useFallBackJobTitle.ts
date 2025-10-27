'use client';
import { RootState } from "@/app/redux/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const useFallBackJobTitle = (jobTitle: string) => {
    const contents = useSelector((state: RootState) => state.roadmapDetails);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        if (typeof window === 'undefined') return; // skip server
        if (!jobTitle) {
            const fallbackTitle = contents.jobTitle || JSON.parse(localStorage.getItem('jobTitle') || 'null');
            if (!fallbackTitle) {
                window.location.href = '/';
                return;
            }
            // Create new search params object
            const params = new URLSearchParams(searchParams.toString());
            params.set('jobtitle', fallbackTitle);
            const redirectUrl = `${pathname}?${params.toString()}`;
            window.location.href = redirectUrl;
        }
    }, [jobTitle, contents.jobTitle, pathname, searchParams]);
}

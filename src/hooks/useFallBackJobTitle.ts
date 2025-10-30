'use client';
import { RootState } from "@/app/redux/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
export const useFallBackJobTitle = () => {
  const jobTitle = useSelector((state: RootState) => state.jobDetails.jobTitle);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectTriggered = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    // Prevent infinite redirect loops
    if (redirectTriggered.current) {
      return;
    }
    if (!jobTitle) {
      const storedJobTitle = localStorage.getItem('jobTitle');
      const fallbackTitle = jobTitle || JSON.parse(storedJobTitle || 'null');
      if (!fallbackTitle) {
        redirectTriggered.current = true;
        window.location.href = '/';
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set('jobtitle', fallbackTitle);
      const redirectUrl = `${pathname}?${params.toString()}`;
      redirectTriggered.current = true;
      window.location.href = redirectUrl;
    }
  }, [ jobTitle, pathname, searchParams]);
};

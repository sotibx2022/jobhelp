'use client';
import { RootState } from "@/app/redux/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
export const useFallBackJobTitle = () => {
  const jobTitle = useSelector((state: RootState) => state.jobDetails.jobTitle);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!jobTitle) {
      const storedJobTitle = localStorage.getItem('jobTitle');
      const fallbackTitle = jobTitle || JSON.parse(storedJobTitle || 'null');
      if (!fallbackTitle) {
        window.location.href = '/';
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set('jobtitle', fallbackTitle);
      const redirectUrl = `${pathname}?${params.toString()}`;
      window.location.href = redirectUrl;
    }else{
      return;
    }
  }, [ jobTitle, pathname, searchParams]);
};

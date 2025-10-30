'use client';
import { RootState } from "@/app/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const useFallBackJobTitle = () => {
  const jobTitle = useSelector((state: RootState) => state.jobDetails.jobTitle);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!jobTitle) {
      const storedJobTitle = localStorage.getItem("jobTitle");
      const fallbackTitle = JSON.parse(storedJobTitle || "null");
      if (!fallbackTitle) {
        // No fallback at all → go home
        router.replace("/");
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      if (params.get("jobtitle") === fallbackTitle) {
        // Already correct, do nothing → avoids looping
        return;
      }
      params.set("jobtitle", fallbackTitle);
      const redirectUrl = `${pathname}?${params.toString()}`;
      router.replace(redirectUrl); // avoid full reload
    }
  }, [jobTitle, pathname, searchParams, router]);
};

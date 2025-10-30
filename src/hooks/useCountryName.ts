// src/hooks/useCountryName.ts
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useCountryName() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [country, setCountry] = useState<string>("");
  // 🧠 1. Detect user's country (using IP)
  const { data: detectedCountry, isPending } = useQuery({
    queryKey: ["detectedCountry"],
    queryFn: async () => {
      try {
        const response = await axios.post("https://ipapi.co/json/");
        return response.data.country_name;
      } catch (error) {
        return "United States"; // fallback
      }
    },
  });
  // 🧭 2. When route changes or detectedCountry changes, sync URL
  useEffect(() => {
    if (isPending) return;
    const currentParams = new URLSearchParams(searchParams.toString());
    const currentCountry = currentParams.get("country");
    // If URL has no country, or differs from detected, update it
    if (!currentCountry) {
      const newCountry = detectedCountry || "United States";
      currentParams.set("country", newCountry);
      router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
      setCountry(newCountry);
    } else {
      setCountry(currentCountry);
    }
  }, [pathname, searchParams, detectedCountry, isPending, router]);
  return { country, setCountry };
}

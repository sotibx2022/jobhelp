"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const countriesFetchUrl = "https://restcountries.com/v3.1/all?fields=name,flags";
export default function SelectableCountries() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initialCountry, setInitialCountry] = useState('Loading...')
  const { data: countryName, isPending } = useQuery({
    queryKey: ['country'], queryFn: async () => {
      try {
        const response = await axios.post('https://ipapi.co/json/');
        return response.data.country_name;
      } catch (error) {
        return 'United State'
      }
    }
  })
  useEffect(() => {
    if (countryName) {
      setInitialCountry(countryName)
    }
  }, [countryName, isPending])
  const handleCountryChange = (newCountry: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("country", newCountry);
    router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data: countriesData, isPending: isLoading } = useQuery({
    queryKey: ["allCountries"],
    queryFn: async () => {
      const response = await axios.get(countriesFetchUrl);
      return response.data;
    },
  });
  useEffect(() => {if(value){
     handleCountryChange(value)
  } }, [value])
  if (isLoading) return <div>Loading countries...</div>;
  return (
    <div className="w-full max-w-sm p-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? countriesData.find((country: any) => country.name.common === value)?.name.common
              : initialCountry}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countriesData.map((country: any) => (
                  <CommandItem
                    key={country.name.common}
                    value={country.name.common}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Image
                      src={country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                      width={25}
                      height={15}
                      className="rounded-sm"
                    />
                    <span>{country.name.common}</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === country.name.common ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

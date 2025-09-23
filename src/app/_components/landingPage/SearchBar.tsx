"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const doSubmit = () => {
        if (!searchValue.trim()) return;
        router.push(`/overview?jobtitle=${encodeURIComponent(searchValue)}`);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            doSubmit();
        }
    };
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="p-4">
                <Input
                    type="text"
                    placeholder="eg. Maintenance Planner"
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-base h-12"
                />
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addJobDetails, removeJobDetails } from "@/app/redux/jobdetailsSlice";
import { RootState } from "@/app/redux/store";
export default function SearchBar() {
    const jobTitleState = useSelector((state: RootState) => state.jobDetails.jobTitle)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState(jobTitleState ?? "");
    const router = useRouter();
    const doSubmit = () => {
        if (!searchValue.trim()) return;
        dispatch(addJobDetails({ jobTitle: searchValue }))
        router.push(`/overview?jobtitle=${encodeURIComponent(searchValue)}`);
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }
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
                    onChange={changeHandler}
                    onKeyDown={handleKeyDown}
                    className="text-base h-12"
                />
            </div>
        </div>
    );
}

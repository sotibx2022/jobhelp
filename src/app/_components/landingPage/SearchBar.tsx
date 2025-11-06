"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addJobDetails, setJobDetails } from "@/app/redux/jobdetailsSlice";
import { RootState } from "@/app/redux/store";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AbsoluteIcon from "../structures/AbsoluteIcon";
const SearchBar: React.FC<{ jobTitle?: string }> = ({ jobTitle }) => {
    const jobTitleState = useSelector((state: RootState) => state.jobDetails.jobTitle);
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState(jobTitleState ?? "");
    const router = useRouter();
    const searchParams = useSearchParams()
    const pathName = usePathname()
    useEffect(() => {
        const jobtitle = searchParams.get('jobtitle') || '';
        dispatch(addJobDetails({ jobTitle: jobtitle }))
        setSearchValue(jobtitle)
    }, [searchParams])
    const doSubmit = () => {
        if (!searchValue.trim()) return;
        localStorage.setItem('jobTitle', JSON.stringify('Maintenance planner'));
        dispatch(addJobDetails({ jobTitle: searchValue }));
            router.push(`/roadmap?jobtitle=${encodeURIComponent(searchValue)}`);
        }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            doSubmit();
        }
    };
    const handleClear = () => {
        setSearchValue("");
    };
    return (
        <div className="flexCenter">
            <div className="relative p-4">
                <AbsoluteIcon left="20px" icon={<Search />} />
                <Input
                    type="text"
                    placeholder="eg. Event Planner"
                    value={searchValue}
                    onChange={changeHandler}
                    onKeyDown={handleKeyDown}
                    className="text-base h-12 pl-10 pr-24" // padding left for icon, right for buttons
                />
                {searchValue.length > 1 && (
                    <AbsoluteIcon right="20px" icon={<X />} onClick={handleClear} />
                )}
            </div>
            <Button onClick={doSubmit}>
                <ArrowRight className="w-5 h-5" />
            </Button>
        </div>
    );
}
export default SearchBar
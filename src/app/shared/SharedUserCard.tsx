import React from "react";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
type SharedUserCardProps = {
    fullName?: string;
    userToken: string;
    link?: boolean;
    text?: string;
};
const SharedUserCard = ({ fullName, userToken, link, text }: SharedUserCardProps) => {
    return (
        <div>
            <div className="userProfile p-2 bg-card roundedExtra my-2 mx-auto flex items-center gap-3 w-fit z-10">
                <div className="primaryParagraph capitalize flexCenter gap-2">
                    <User className="w-6 h-6 text-muted-foreground" />
                    {text && <p className="primaryParagraph">{text}</p>}
                    {fullName ?? "Guest User"}
                </div>
                {link && <Button asChild className="flex items-center gap-2 ButtonText">
                    <Link href={`/shared/profile?usertoken=${userToken}`}>
                        <ArrowLeft className="w-4 h-4" />
                        Profile
                    </Link>
                </Button>}
            </div>
        </div>
    );
};
export default SharedUserCard;

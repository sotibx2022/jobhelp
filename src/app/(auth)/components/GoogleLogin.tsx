import Image from "next/image";
import React from "react";
import googleImage from "../../../../public/google.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const GoogleLogin = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Horizontal separator with some spacing */}
      <div className="flex items-center w-full">
        <Separator className="flex-1" />
        <Badge>Or</Badge>
        <Separator className="flex-1" />
      </div>
      <Button variant={'outline'}>
        <Image src={googleImage} alt="Google Icon" width={20} height={20} />
        <span className="primaryParagraph">Continue with Google</span>
      </Button>
    </div>
  );
};
export default GoogleLogin;

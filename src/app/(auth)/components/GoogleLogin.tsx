import Image from "next/image";
import React from "react";
import googleImage from "../../../../public/socialicons/google.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Divider from "@/app/_components/common/Divider";
const GoogleLogin = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-4">
      {/* Horizontal separator with some spacing */}
      <Divider text="or"/>
      <Button variant={'outline'}>
        <Image src={googleImage} alt="Google Icon" width={20} height={20} />
        <span className="primaryParagraph">Continue with Google</span>
      </Button>
    </div>
  );
};
export default GoogleLogin;

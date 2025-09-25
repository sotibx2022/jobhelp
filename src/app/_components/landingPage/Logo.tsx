import Image from "next/image";
import React from "react";
import logoImage from "../../../../public/jobriselogo.png";
import Link from "next/link";
const Logo = () => {
  return (
    <div className="logoContainer">
  <Link href="/">
    <Image
      src={logoImage}
      alt="JobRise Logo"
      fill
      style={{ objectFit: "contain" }}
      priority
    />
  </Link>
</div>
  );
};
export default Logo;

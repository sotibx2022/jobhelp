import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
interface AuthLinksProps {
  component: "login" | "register" | "reset";
}
const AuthLinks: React.FC<AuthLinksProps> = ({ component }) => {
  const links = {
    login: [
      { text: "Not created yet? Register", href: "/register" },
      { text: "Forgot Password? Reset", href: "/reset" },
    ],
    register: [
      { text: "Already Registered? Login", href: "/login" },
      { text: "Forgot Password? Reset", href: "/reset" },
    ],
    reset: [
      { text: "Already Registered? Login", href: "/login" },
      { text: "Not created yet? Register", href: "/register" },
    ],
  };
  return (
    <div>
      <ul>
        {links[component].map((link, index) => (
          <li key={index} className="text-foreground flex items-center gap-2">
            <CheckCircle className="w-4 h-4"/>
            <Link href={link.href} className="hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AuthLinks;

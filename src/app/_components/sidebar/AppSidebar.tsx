"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  User,
  Route,
  FileText,
  BriefcaseBusiness,
  Edit,
  DollarSign,
} from "lucide-react"
import { SidebarItem } from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import EditButton from "../structures/EditButton";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
const sidebarItems = [
  { label: "Roadmap", icon: Route, href: "/roadmap" },
  { label: "Resume", icon: FileText, href: "/resume" },
  { label: "Salary", icon: DollarSign, href: '/salary' },
];
const AppSidebar = () => {
  const { state, isMobile } = useSidebar()
  const showText = state === "expanded" || isMobile
  const user = useSelector((state: RootState) => state.user.user)
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get('jobtitle')
  const router = useRouter()
  const logout = useLogout()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.label} {...item} showText={showText} />
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="sidebarFooterHeader flex gap-2">
          <h2 className="primaryPatagraph capitalize flex gap-2">
            <BriefcaseBusiness />
            {jobTitle}
          </h2>
          {user?.jobTitles && user?.jobTitles?.length > 0 && <Edit onClick={() => router.push('/profile')} className="linkText w-4 h-4 cursor-pointer" />}
        </div>
        <div className="sidebarProfile flex gap-2 items-center">
          <Link href="/profile" className="linkText capitalize">{user?.fullName || "Guest User"}</Link>
          {user && (
            <Link href="/profile" className="linkText">
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
        {user ? <Button variant={'destructive'} onClick={() => logout.mutate({ skipBroadcast: false })}>Logout</Button> :
          <Button variant={'secondary'} onClick={() => router.push('/register')}> Register</Button>}
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar

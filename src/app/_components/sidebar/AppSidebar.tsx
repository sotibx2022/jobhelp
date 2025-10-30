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
  LayoutDashboard,
  Wallet,
  BadgeCheck,
  Wrench,
  GraduationCap,
  Route,
  CheckSquare,
  Briefcase,
  FileText,
  LogOut,
  BriefcaseBusiness,
} from "lucide-react"
import { SidebarItem } from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import EditButton from "../structures/EditButton";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
const sidebarItems = [
  { label: "Roadmap", icon: Route, href: "/roadmap" },
  { label: "Resume", icon: FileText, href: "/resume" },
];
const AppSidebar = () => {
  const { state, isMobile } = useSidebar()
  const showText = state === "expanded" || isMobile
  const user = useSelector((state:RootState)=>state.user.user)
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get('jobtitle')
  const router = useRouter()
  const LogOut = useLogout()
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
            <BriefcaseBusiness/>
            {jobTitle}
            </h2>
        {user?.jobTitles && user?.jobTitles?.length>0 && <EditButton onClick={()=>router.push('/profile')}/>}
        </div>
        <div className="sidebarProfile">
        <p className="primaryParagraph">{user?.fullName || "Guest User"}</p>
        </div>
        {user? <Button variant={'destructive'} onClick={()=>LogOut.mutate}>Logout</Button>:
        <Button variant={'secondary'} onClick={()=>router.push('/register')}> Register</Button>}
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar

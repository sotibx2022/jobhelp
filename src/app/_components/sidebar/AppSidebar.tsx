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
} from "lucide-react"
import { SidebarItem } from "./SidebarItem";
const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/overview" },
  { label: "Salary", icon: Wallet, href: "/salary" },
  { label: "Skills", icon: BadgeCheck, href: "/skills" },
  { label: "Tools", icon: Wrench, href: "/tools" },
  { label: "Education", icon: GraduationCap, href: "/education" },
  { label: "Roadmap", icon: Route, href: "/roadmap" },
  { label: "Checklist", icon: CheckSquare, href: "/checklist" },
  { label: "Jobs", icon: Briefcase, href: "/jobs" },
  { label: "Resume", icon: FileText, href: "/resume" },
];
const AppSidebar = () => {
  const { state, isMobile } = useSidebar()
  const showText = state === "expanded" || isMobile
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
      <SidebarFooter />
    </Sidebar>
  )
}
export default AppSidebar

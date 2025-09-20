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
const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Salary", icon: Wallet },
  { label: "Skills", icon: BadgeCheck },
  { label: "Tools", icon: Wrench },
  { label: "Education", icon: GraduationCap },
  { label: "Roadmap", icon: Route },
  { label: "Checklist", icon: CheckSquare },
  { label: "Jobs", icon: Briefcase },
  { label: "Resume", icon: FileText },
]
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
            {sidebarItems.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer"
              >
                <Icon className="w-5 h-5 text-muted-foreground shrink-0" />
                {showText && (
                  <span className="text-sm font-medium text-muted-foreground">
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
export default AppSidebar

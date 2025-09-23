import Link from "next/link"
import { usePathname } from "next/navigation"
export const SidebarItem = ({ label, icon: Icon, href, showText=true }: any) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer
          ${
            isActive
              ? "text-primary"
              : "hover:bg-muted text-muted-foreground"
          }`}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {showText && <span className="text-sm font-medium">{label}</span>}
      </Link>
    </li>
  )
}
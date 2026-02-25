"use client";
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  Settings,
  LogOut,
  BookOpen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "applications",
    label: "Applications",
    icon: FileText,
    href: "/admin/applications",
  },
  { id: "students", label: "Students", icon: Users, href: "/admin/student" },
  {
    id: "announcements",
    label: "Announcements",
    icon: Megaphone,
    href: "/admin/announcements",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside
      className="w-60 min-h-screen flex flex-col flex-shrink-0 border-r border-white/5"
      style={{
        background:
          "linear-gradient(180deg,#071510 0%,#0f2419 60%,#080f1e 100%)",
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#15803d,#166534)" }}
          >
            <BookOpen size={16} color="white" />
          </div>
          <div>
            <p className="text-white text-xs font-extrabold tracking-widest">
              GLADTIDINGS
            </p>
            <p className="text-green-300 text-[10px] tracking-widest">
              ADMIN PANEL
            </p>
          </div>
        </div>
        <p className="text-green-300/40 text-[10px] italic font-serif">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-1">
        <p className="text-green-300/40 text-[10px] tracking-widest uppercase px-2 mb-2">
          Management
        </p>
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-150
                ${
                  isActive
                    ? "bg-green-500/15 border border-green-500/25 text-green-300"
                    : "border border-transparent text-green-300/60 hover:bg-white/5 hover:text-green-300"
                }`}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-2.5 py-3 border-t border-white/5">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white/5 mb-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-green-300 border border-green-300/30 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#15803d,#0f2419)" }}
          >
            A
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Admin</p>
            <p className="text-green-300/50 text-[11px]">School Manager</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-red-400 text-sm hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

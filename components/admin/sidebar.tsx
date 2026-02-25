"use client";
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard",     icon: LayoutDashboard, href: "/admin" },
  { label: "Applications",  icon: FileText,        href: "/admin/applications" },
  { label: "Students",      icon: Users,           href: "/admin/student" },
  { label: "Announcements", icon: Megaphone,       href: "/admin/announcements" },
  { label: "Settings",      icon: Settings,        href: "/admin/settings" },
];

const bg = "linear-gradient(180deg,#071510 0%,#0f2419 60%,#080f1e 100%)";

function NavContent({
  pathname,
  onNav,
  onLogout,
}: {
  pathname: string;
  onNav: (href: string) => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden relative flex-shrink-0 shadow-lg">
            <Image
              src="/Gladtidings_LOGO.JPG"
              alt="Glad Tidings Logo"
              fill
              className="object-contain"
              sizes="32px"
              priority
            />
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

      {/* Nav links */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-1 overflow-y-auto">
        <p className="text-green-300/40 text-[10px] tracking-widest uppercase px-2 mb-2">
          Management
        </p>
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => onNav(href)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-150
                ${isActive
                  ? "bg-green-500/15 border border-green-500/25 text-green-300"
                  : "border border-transparent text-green-300/60 hover:bg-white/5 hover:text-green-300"
                }`}
            >
              <Icon size={15} /> {label}
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
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-red-400 text-sm hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const handleNav = (href: string) => {
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Mobile top bar (hidden on lg+) ── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-white/5"
        style={{ background: "#071510" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg overflow-hidden relative flex-shrink-0">
            <Image
              src="/Gladtidings_LOGO.JPG"
              alt="Glad Tidings Logo"
              fill
              className="object-contain"
              sizes="28px"
              priority
            />
          </div>
          <span className="text-white text-xs font-extrabold tracking-widest">
            GLADTIDINGS
          </span>
        </div>

        {/* Hamburger toggle */}
        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="text-green-300 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile drawer (hidden on lg+) ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Drawer panel */}
          <div
            className="relative z-10 w-60 h-full flex flex-col"
            style={{ background: bg }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 text-green-300/60 hover:text-green-300 p-1 z-10"
            >
              <X size={18} />
            </button>
            <NavContent
              pathname={pathname}
              onNav={handleNav}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* ── Desktop fixed sidebar (hidden below lg) ── */}
      <aside
        className="hidden lg:flex flex-col w-60 fixed top-0 left-0 h-screen z-30 border-r border-white/5"
        style={{ background: bg }}
      >
        <NavContent
          pathname={pathname}
          onNav={handleNav}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}
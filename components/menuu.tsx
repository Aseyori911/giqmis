"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Menuu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Programs", path: "/Programs" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Contact", path: "/Contact" },
  ];

  const mobileLinkClass = (path: string) =>
    pathname === path
      ? "block text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-2 rounded-md border-l-4 border-orange-600"
      : "block text-sm text-white hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-md transition-all duration-200";

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <div className="lg:hidden relative z-50">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-orange-600 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>

          {/* Slide-in Menu */}
          <div
            className="fixed top-0 right-0 w-100 h-full bg-gradient-to-r from-black/90 to-black/70 shadow-lg z-50 p-6 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={mobileLinkClass(item.path)}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
// https://github.com/Aseyori911/GIQMIS.git
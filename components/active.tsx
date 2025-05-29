"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Active() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Programs", path: "/Programs" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Contact", path: "/Contact" },
  ];

  const linkClass = (path: string) =>
    pathname === path
      ? "text-sm font-semibold text-orange-600 underline"
      : "text-sm text-gray-700 hover:text-orange-600 transition-colors duration-200";

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={linkClass(item.path)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <input type="checkbox" id="mobile-menu" className="hidden peer" />
        <div className="peer-checked:block hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300">
            <div className="p-6">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={linkClass(item.path)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

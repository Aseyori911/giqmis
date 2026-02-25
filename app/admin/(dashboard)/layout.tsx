import Sidebar from "@/components/admin/sidebar";
// import Sidebar from "@/components/slider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Sidebar />
      {/* offset for desktop fixed sidebar, offset top on mobile for the topbar */}
      <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
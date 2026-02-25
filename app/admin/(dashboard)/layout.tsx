import Sidebar from "@/components/admin/sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#faf8f4] min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
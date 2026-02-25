import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
        <Toaster position="top-right" />
      </main>
      <Footer />
    </>
  );
}

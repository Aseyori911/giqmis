import { getLocale } from 'next-intl/server'
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
        <Toaster position={locale === 'ar' ? 'top-left' : 'top-right'} />
      </main>
      <Footer />
    </>
  )
}
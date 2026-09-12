// src/app/(website)/layout.tsx
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Preloader from '@/components/website/Preloader'

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
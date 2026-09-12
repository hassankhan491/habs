// src/app/(website)/layout.tsx
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'


export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
  
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Component/Navbar/navbar'
import Footer from './Component/Footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dil Foods E-Commerce App',
  description: 'Created the Dil Foods E-Commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
        <Footer/>
        </body>
    </html>
  )
}

import Link from 'next/link'
import './globals.css'
import Image from 'next/image'
import { BsCart3 } from "react-icons/bs";


import Header from './_components/Header';

export const metadata = {
  title: {
    template: "%s - Shopify",
    default: "Welcome to Shopify"
  },
  description: 
  "Ecommerce website for shopping cloth"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen mx-auto max-w-6xl max-md:text-sm max-md2:text-xs ">
        <Header />

        <main className='mx-auto w-full mt-10'>
          { children }
        </main>
      </body>
    </html>
  )
}

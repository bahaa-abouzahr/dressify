import './globals.css';

import Navigation from './_components/Navigation';

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
      <body className="relative min-h-screen mx-auto max-w-6xl max-md:text-sm max-md2:text-xs">
        <Navigation />

        <main className='mx-auto w-full mt-10'>
          { children }
        </main>
      </body>
    </html>
  )
}

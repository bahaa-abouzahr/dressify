import './globals.css';

import Navigation from './_components/Navigation';
import ScrollToTop from './_components/ScrollToTop';
import { CartProvider } from './_components/CartContext';
import { PreviewStateProvider } from './_components/PreviewStateContext';
import ClientOverlay from './_components/ClientOverlay';
import { WishlistProvider } from './_components/WishlistContext';

import { Toaster } from "react-hot-toast"
import { notFound } from 'next/navigation';

notFound
export const metadata = {
  title: {
    template: "%s - Shopify",
    default: "Welcome to Shopify"
  },
  description: 
  "Ecommerce website for shopping cloth"
}

export default function RootLayout({ children, params }) {
  

  return (
    <html lang="en">
      <body className="relative min-h-screen mx-auto max-w-6xl md2:px-4">
        <CartProvider>
          <PreviewStateProvider>
            <WishlistProvider>

              <ScrollToTop />

              <Navigation params={params} />
              <ClientOverlay />
              <main className='mx-auto w-full mt-10'>
                { children }
              </main>

            <Toaster 
              postiion="top-center"
              gutter={12}
              containerStyle={{margin: "8px"}}
              toastOptions={{
                success: {
                  duration: 3000
                },
                error: {
                  duration: 5000
                },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'var(--gray-bg)',
                  color: 'var(--gray-text)',
                  marginTop: '3rem',
                }
              }}
            />

            </WishlistProvider>
          </PreviewStateProvider>
        </CartProvider>
      </body>
    </html>
  )
}

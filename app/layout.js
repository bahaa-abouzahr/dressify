import './globals.css';

import Navigation from './_components/Navigation';
import ScrollToTop from './_components/ScrollToTop';
import { CartProvider } from './_components/CartContext';
import { PreviewStateProvider } from './_components/PreviewStateContext';
import ClientOverlay from './_components/ClientOverlay';
import WishlistContext, { WishlistProvider } from './_components/WishlistContext';

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
      <body className="relative min-h-screen mx-auto max-w-6xl md2:px-4">
        <CartProvider>
          <PreviewStateProvider>
            <WishlistProvider>

              <ScrollToTop />

              <Navigation />
              <ClientOverlay />
              <main className='mx-auto w-full mt-10'>
                { children }
              </main>
       
            </WishlistProvider>
          </PreviewStateProvider>
        </CartProvider>
      </body>
    </html>
  )
}

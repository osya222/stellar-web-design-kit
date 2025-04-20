
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import PublicOffer from './pages/PublicOffer'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import { CartProvider } from './context/CartContext'
import { Toaster } from './components/ui/toaster'
import './App.css'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/public-offer" element={<PublicOffer />} />
            <Route path="/privacy-policy" element={<PublicOffer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

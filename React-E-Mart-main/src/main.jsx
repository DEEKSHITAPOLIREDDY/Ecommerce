import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './stores/context/CartContext.jsx'
import { AuthContextProvider } from './stores/context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>

  <React.StrictMode>
    <AuthContextProvider>
    <CartProvider>

    <App />
    </CartProvider>
    </AuthContextProvider>
  </React.StrictMode>
  
</BrowserRouter>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CartProvider from './context/cartContext.jsx'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Provider store={store}>
    <App />
      </Provider>
        
    </CartProvider>
  </React.StrictMode>,
)

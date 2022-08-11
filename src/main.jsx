import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import Settings from './routes/settings'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    
  </BrowserRouter>
  
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)

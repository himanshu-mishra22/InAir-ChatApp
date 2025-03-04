import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from '../App'
import ChatPage from '../pages/ChatPage'
function AppRoutes() {
  return (
    <Routes>
    <Route path='/' element={<App />} />
    <Route path='/chat' element={<ChatPage />} />
  </Routes>
  )
}

export default AppRoutes
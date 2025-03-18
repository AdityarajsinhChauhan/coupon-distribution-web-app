import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import axios from 'axios'



function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/manage/admin' element={<Admin/>}/>
      
    </Routes>
      
    </BrowserRouter>
  )
}

export default App

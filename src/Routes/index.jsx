import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Frontend/Home'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      {/* <Route path="/" element={<Login />}/> */}
    </Routes>
  )
}

export default AppRoutes

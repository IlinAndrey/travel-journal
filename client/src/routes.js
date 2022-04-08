import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage/Login'
import MainPage from './pages/MainPage/MainPage'
import Reg from './pages/RegPage/Reg'

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/' exact element={<MainPage replace to='/'/>} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/login' exact element={<Login replace to='/'/>} />
            <Route path='/register' element={<Reg />} />
        </Routes>
    )
}
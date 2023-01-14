import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

const RouteApp = () => {
    const isLoggedIn = useSelector(state => state.auth.token);

    const protectedRoutes = <>
        <Route path="/dashboard" element={<Home />} />
    </>

    const guestRoutes = <>
        <Route path="/login" element={<Login />} />
    </>

    return (
        <>
            <Routes>
                {isLoggedIn ? protectedRoutes : guestRoutes}
                <Route path="/dashboard" element={<Home />} />
            </Routes>
        </>
    )
}

export default RouteApp
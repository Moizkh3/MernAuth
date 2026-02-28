import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* Global Toast Container */}
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App;
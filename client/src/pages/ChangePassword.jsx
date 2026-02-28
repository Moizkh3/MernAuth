import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const ChangePassword = () => {

    const { backendUrl, isLoggedIn, userData } = useContext(AppContext)
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.error("Please login to change your password")
            return navigate('/login')
        }

        if (newPassword !== confirmPassword) {
            return toast.error("New passwords do not match")
        }

        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/change-password', {
                oldPassword,
                newPassword
            })

            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Redirect if not logged in (basic protection, App.jsx routing should also handle this ideally)
    // Wait for userData to be available or handle strictly in component
    if (isLoggedIn === false && userData === false) {
        // Optional: navigate('/login') here if strictly protected
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />

            <motion.div
                layout
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-blue-400 text-sm"
            >
                <h2 className="text-3xl font-semibold text-white text-center mb-3">Change Password</h2>
                <p className="text-center text-sm mb-6">Enter your old and new password</p>

                <form onSubmit={onSubmitHandler} className="transition-all duration-500 ease-in-out animate-fade">

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                            type="password"
                            placeholder="Old Password"
                            required
                            className="bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            type="password"
                            placeholder="New Password"
                            required
                            className="bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            placeholder="Confirm New Password"
                            required
                            className="bg-transparent outline-none text-white w-full"
                        />
                    </div>

                    <button className="w-full py-2.5 rounded-full mt-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:shadow-lg active:scale-95 transition-all duration-200">
                        Change Password
                    </button>
                </form>

            </motion.div>
        </div>
    )
}

export default ChangePassword

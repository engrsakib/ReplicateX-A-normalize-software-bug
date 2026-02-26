import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import lottieLogin from "../../../../public/lottie/chatbot.json";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Lock, ArrowRight, Phone, Loader2, UserCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

export default function ModernLogin() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/user/login`, {
                phone_number: phone,
                password: password
            });

            const result = response.data;
            const userData = result?.data?.user;
            const token = result?.data?.access_token;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                toast.success(
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <UserCircle className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-white">
                                Welcome, {userData?.name || 'Partner'}!
                            </span>
                            <span className="text-[10px] text-slate-400">Redirecting to your dashboard...</span>
                        </div>
                    </div>,
                    {
                        theme: "dark",
                        icon: false,
                        style: { background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }
                    }
                );

                setTimeout(() => navigate('/'), 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Access Denied: Invalid Credentials', {
                theme: "dark",
                style: { background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-slate-800/60 rounded-xl ${className}`} />
    );

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} theme="dark" />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-center">

                {/* Left Side */}
                <div className="space-y-5 p-4  ">
                    {isPageLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-full h-12" />
                            <Skeleton className="w-3/4 h-12" />
                            <Skeleton className="w-1/2 h-6 mt-4" />
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <div className="text-start mb-5">
                                <motion.div
                                    className="inline-flex items-center gap-2 mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                                    <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                        AI-Powered Login
                                    </span>
                                </motion.div>

                                <motion.h2
                                    className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight"
                                    initial={{ y: -20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                        Sign in Your
                                    </span>{' '}
                                    Account
                                </motion.h2>
                            </div>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                                Join thousands of users who are already experiencing the future with our platform. Create your account in seconds.
                            </p>
                        </motion.div>
                    )}

                    <div className="bg-[#0f172a] rounded-[2rem] p-8 aspect-video flex items-center justify-center border border-white/5 overflow-hidden">
                        {isPageLoading ? (
                            <Loader2 className="w-10 h-10 text-slate-700 animate-spin" />
                        ) : (
                            <Lottie loop animationData={lottieLogin} play className="w-full max-w-[460px]" />
                        )}
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex justify-center lg:justify-end ">
                    <div className="w-full max-w-full p-6 space-y-10">
                        {isPageLoading ? (
                            <div className="space-y-8">
                                <Skeleton className="w-48 h-8" />
                                <div className="space-y-6 pt-4">
                                    <Skeleton className="w-full h-14" />
                                    <Skeleton className="w-full h-14" />
                                    <Skeleton className="w-full h-14" />
                                </div>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                <div className="text-center lg:text-left">
                                    <h2 className="text-3xl font-bold text-white mb-2">Login to continue</h2>
                                    <p className="text-slate-500 text-sm font-medium">Enter your credentials below</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#22d3ee] transition-colors" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="01XXXXXXXXX"
                                                className="w-full h-14 bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:border-[#22d3ee]/40 transition-all placeholder:text-slate-700"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">

                                        <div className="relative group">
                                            <label className="text-xs font-bold  text-slate-500 ml-1  uppercase tracking-wider">Password</label>

                                            <Lock className="absolute left-4 mt-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#22d3ee] transition-colors" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full h-14 bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-12 text-white focus:outline-none focus:border-[#22d3ee]/40 transition-all placeholder:text-slate-700"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 mt-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
                                    </button>
                                </form>

                                {/* Footer */}
                                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-center text-gray-600 dark:text-gray-400">
                                        Have an account?{' '}
                                        <Link to="/register">
                                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
                                                Sign Up here
                                            </span>
                                        </Link>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


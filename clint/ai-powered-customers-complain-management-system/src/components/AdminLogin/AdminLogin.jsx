import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import lottieLoginAdmin from "../../../public/lottie/ai paper generator.json";

import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/20 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-gray-800/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-700">

            {/* Left Section Skeleton */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Gradient Background Skeleton */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-800/20"></div>

                {/* Animated Floating Elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Content Skeleton */}
                <div className="relative z-10 space-y-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl animate-pulse"></div>
                        <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-4">
                        <div className="h-12 w-full bg-gray-700 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-3/4 bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-4/6 bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Features List Skeleton */}
                    <div className="space-y-4 pt-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-800/20">
                <div className="max-w-md mx-auto space-y-8">
                    {/* Form Header Skeleton */}
                    <div className="text-center space-y-4">
                        <div className="h-8 w-48 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-700 rounded mx-auto animate-pulse"></div>
                    </div>

                    {/* Social Buttons Skeleton */}
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-12 bg-gray-700 rounded-xl animate-pulse"></div>
                        ))}
                    </div>

                    {/* Divider Skeleton */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 h-px bg-gray-700"></div>
                        <div className="h-4 w-24 bg-gray-700 rounded mx-4 animate-pulse"></div>
                        <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    {/* Form Inputs Skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <div className="h-5 w-24 bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-5 w-20 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    {/* Submit Button Skeleton */}
                    <div className="h-14 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl animate-pulse"></div>

                    {/* Footer Skeleton */}
                    <div className="pt-8 border-t border-gray-700">
                        <div className="h-5 w-64 bg-gray-700 rounded mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true); // Page loading state
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const socialButtons = [

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
            ),
            label: 'Google',
            bg: 'bg-white hover:bg-gray-50',
            text: 'text-gray-700'
        }
    ];



    if (isPageLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-transparent flex py-20 items-center justify-center p-4 font-sans">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-transparent backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">

                {/* Left Section - Lottie Animation & Info */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5"></div>

                    {/* Animated Floating Elements */}
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    {/* Content */}
                    <div className="relative z-10">
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
                                className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight "
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Sign in to Admin
                                </span>{' '}
                                account
                            </motion.h2>


                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                            Access your dashboard and continue your journey with our modern, secure platform.
                        </p>

                        {/* Lottie Animation Container */}
                        <div className="relative w-full max-w-xl mx-auto mb-8">
                            <div className="absolute -inset-4 bg rounded-2xl blur-2xl"></div>
                            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                                <Lottie
                                    loop
                                    animationData={lottieLoginAdmin}
                                    play
                                    speed={0.8}
                                    className="w-full h-auto"
                                    rendererSettings={{
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }}
                                />
                            </div>
                        </div>


                    </div>
                </div>

                {/* Right Section - Login Form */}
                <div className="lg:w-1/2 p-5 lg:p-5 bg-transparent">
                    <div className="max-w-full mx-auto">
                        {/* Form Header */}
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Login to continue
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Enter your credentials below
                            </p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="justify-center flex items-center  gap-3 mb-8">
                            {socialButtons.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isLoading}
                                    className={`flex items-center justify-center h-12 px-4 rounded-xl border transition-all duration-300 ${item.bg} border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <div className={item.text}>
                                        {item.icon}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Or continue with</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-6" >
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <div className={`relative group ${isFocused.email ? 'ring-2 ring-indigo-500/20' : ''}`}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                                        placeholder="you@example.com"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className={`relative group ${isFocused.password ? 'ring-2 ring-indigo-500/20' : ''}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">{error}</span>
                                </div>
                            )}

                            {/* Submit Button with Loading State */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {isLoading ? (
                                    <div className="relative flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="relative flex items-center justify-center gap-3">
                                        <span>Sign In</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
}
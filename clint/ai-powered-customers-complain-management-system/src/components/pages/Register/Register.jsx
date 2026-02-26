import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Lottie from 'react-lottie-player';
import lottieRegister from "../../../../public/lottie/ai paper generator.json";
import { FaUser, FaPhone, FaCamera, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/20 flex items-center justify-center p-4">
        {/* ... loading skeleton code remains same ... */}
    </div>
);

export default function ModernRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        password: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState({
        name: false,
        phone_number: false,
        password: false
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        console.log('API_URL:', API_URL);
        console.log('IMGBB_API_KEY exists:', !!IMGBB_API_KEY);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(profileImage);
        } else {
            setPreviewImage(null);
        }
    }, [profileImage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError("Please select an image file");
                return;
            }
            setProfileImage(file);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (!formData.phone_number) {
            setError("Phone number is required");
            return;
        }

        setIsLoading(true);

        try {
            let imageUrl = '';

            // Step 1: Upload image to IMGBB if profileImage exists
            if (profileImage) {
                // ✅ FIXED: Check if IMGBB_API_KEY is available
                if (!IMGBB_API_KEY) {
                    throw new Error('IMGBB API Key is missing');
                }

                const imgbbFormData = new FormData();
                imgbbFormData.append('image', profileImage);

                console.log('Uploading image to IMGBB with key:', IMGBB_API_KEY ? 'Key exists' : 'No key');

                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    imgbbFormData
                );

                if (imgbbResponse.data.success) {
                    imageUrl = imgbbResponse.data.data.url;
                    console.log('Image uploaded successfully:', imageUrl);
                } else {
                    throw new Error('Image upload failed: ' + imgbbResponse.data.error?.message);
                }
            }

            // Step 2: Prepare registration data
            const registrationData = {
                name: formData.name,
                phone_number: formData.phone_number,
                password: formData.password,
                role: "customer"
            };

            // Add image URL to registration data if available
            if (imageUrl) {
                registrationData.image = imageUrl;
            }

            console.log('Sending registration data:', registrationData);
            console.log('API URL:', `${API_URL}/user`);

            // Step 3: Send registration data to API

            const response = await axios.post(
                `${API_URL}/user`, // এখন এটি নিশ্চিতভাবে /api/v1/user হবে
                registrationData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Step 4: Show success message
            if (response.data.success) {
                toast.success(response.data.message || 'Registration successful!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });

                // Reset form
                setFormData({
                    name: '',
                    phone_number: '',
                    password: ''
                });
                setProfileImage(null);
                setPreviewImage(null);
            } else {
                throw new Error(response.data.message || "Registration failed");
            }

        } catch (err) {
            console.error('Registration error:', err);
            console.error('Error response:', err.response?.data);

            // Better error message handling
            let errorMessage = "Registration failed";

            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isPageLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-transparent flex py-20 items-center justify-center p-4 font-sans">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-transparent backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">

                    {/* Left Section - Lottie Animation & Info */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5"></div>

                        {/* Animated Floating Elements */}
                        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
                                        Join Our Community
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
                                        Create Your
                                    </span>{' '}
                                    Account
                                </motion.h2>
                            </div>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                                Join thousands of users who are already experiencing the future with our platform. Create your account in seconds.
                            </p>

                            {/* Lottie Animation Container */}
                            <div className="relative w-full h-full max-w-xl mx-auto">
                                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-2xl"></div>
                                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                                    <Lottie
                                        loop
                                        animationData={lottieRegister}
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

                    {/* Right Section - Register Form */}
                    <div className="lg:w-1/2 p-8 lg:p-5 bg-transparent">
                        <div className="max-w-full mx-auto">
                            {/* Form Header */}
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Create New Account
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Fill in your details below
                                </p>
                            </div>

                            {/* Register Form */}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <div className={`relative group ${isFocused.name ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
                                            onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
                                            placeholder="John Doe"
                                            required
                                            disabled={isLoading}
                                            className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FaUser className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </label>
                                    <div className={`relative group ${isFocused.phone_number ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsFocused(prev => ({ ...prev, phone_number: true }))}
                                            onBlur={() => setIsFocused(prev => ({ ...prev, phone_number: false }))}
                                            placeholder="xxxxxxxxx"
                                            required
                                            disabled={isLoading}
                                            className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FaPhone className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Profile Image (Optional)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="profileImage"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={isLoading}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="profileImage"
                                            className={`flex items-center justify-center h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 ${previewImage ? 'border-solid' : ''} disabled:opacity-50`}
                                        >
                                            {previewImage ? (
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
                                                    />
                                                    <div className="absolute bottom-1 right-1/2 translate-x-1/2 bg-emerald-500 text-white p-1 rounded-full">
                                                        <FaCamera className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <FaCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Click to upload profile photo
                                                    </span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <div className={`relative group ${isFocused.password ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                                            onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                                            placeholder="••••••••"
                                            required
                                            disabled={isLoading}
                                            className="w-full h-14 px-5 pl-12 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <FaLock className="w-5 h-5" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                                        >
                                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Password must be at least 6 characters long
                                    </p>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        disabled={isLoading}
                                        className="w-4 h-4 text-emerald-500 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        I agree to the{' '}
                                        <Link to="/terms-and-conditions">
                                            <span className="text-emerald-500 hover:text-emerald-400 font-medium">
                                                Terms & Conditions
                                            </span>
                                        </Link>
                                    </label>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                                    >
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-red-600 dark:text-red-400">{error}</span>
                                    </motion.div>
                                )}

                                {/* Submit Button with Loading State */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full h-14 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {isLoading ? (
                                        <div className="relative flex items-center justify-center gap-3">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Thinking...</span>
                                        </div>
                                    ) : (
                                        <div className="relative flex items-center justify-center gap-3">
                                            <span>Create Account</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    )}
                                </motion.button>
                            </form>

                            {/* Footer */}
                            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link to="/login">
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
                                            Sign in here
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    IoPersonOutline,
    IoCallOutline,
    IoMailOutline,
    IoKeyOutline,
    IoCalendarOutline,
    IoTimeOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkCircle
} from 'react-icons/io5';
import {
    MdOutlinePersonPin,
    MdOutlinePhoneAndroid,
    MdOutlineEmail,
    MdOutlineWorkOutline,
    MdOutlineSecurity,
    MdOutlineUpdate
} from 'react-icons/md';
import {
    FaUserShield,
    FaUserCheck,
    FaUserClock
} from 'react-icons/fa';
import {
    HiOutlineUserCircle,
    HiOutlineStatusOnline
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ViewProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("No authentication token found");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/user/auth`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setError("Failed to fetch user data");
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
                setError("Error fetching profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Loading Skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-transparent py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-800 rounded w-96 mx-auto animate-pulse"></div>
                    </div>

                    {/* Profile Card Skeleton */}
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden animate-pulse">
                        {/* Profile Image Skeleton */}
                        <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-700">
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-900"></div>
                            </div>
                        </div>

                        {/* Profile Info Skeleton */}
                        <div className="pt-20 pb-8 px-6">
                            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-12"></div>



                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 max-w-md text-center"
                >
                    <div className="text-red-400 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                    <p className="text-gray-300 mb-6"> Please connect you network.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                        Try Again
                    </button>
                </motion.div>
            </div>
        );
    }

    // Main Profile View
    return (
        <div className="min-h-screen bg-transparent py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-2xl md:text-4xl mt-10 font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        {user.role} Profile
                    </h1>
                    <p className="text-gray-400 text-lg">
                        View and manage your account information
                    </p>
                </motion.div>

                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50"
                >
                    {/* Profile Header with Image */}
                    <div className="relative h-64 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <motion.img
                                    src={user.image || "https://via.placeholder.com/150"}
                                    alt={user.name}
                                    className="w-48 h-48 rounded-full border-4 border-gray-900  object-cover"
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                {/* Online Status */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-6">
                        {/* Name and Role */}
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-white mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {user.name}
                            </motion.h2>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-2 rounded-full border border-blue-500/30">
                                <FaUserShield className="text-blue-400" />
                                <span className="text-blue-300 font-semibold uppercase tracking-wider text-sm">
                                    {user.role}
                                </span>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {user.status}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">


                            {/* Account Status */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-xl">
                                        <HiOutlineStatusOnline className="text-2xl text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <p className="text-white font-bold capitalize">{user.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* User ID */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/20 rounded-xl">
                                        <IoKeyOutline className="text-2xl text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">User ID</p>
                                        <p className="text-white font-bold text-xs truncate">{user.id}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {/* Personal Information Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <IoPersonOutline className="text-blue-400" />
                                        </div>
                                        Personal Information
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors">
                                            <MdOutlinePersonPin className="text-2xl text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Full Name</p>
                                                <p className="text-white font-medium">{user.name}</p>
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors">
                                            <MdOutlinePhoneAndroid className="text-2xl text-green-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Phone Number</p>
                                                <p className="text-white font-medium">{user.phone_number}</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </motion.div>

                            {/* Right Column */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {/* Account Details Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 rounded-lg">
                                            <MdOutlineWorkOutline className="text-green-400" />
                                        </div>
                                        Account Details
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Role */}


                                        {/* Created Date */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            <IoCalendarOutline className="text-2xl text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Account Created</p>
                                                <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
                                            </div>
                                        </div>

                                        {/* Last Updated */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            <IoTimeOutline className="text-2xl text-purple-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Last Updated or Sign in</p>
                                                <p className="text-white font-medium">{formatDate(user.updatedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <Link to="/update-profile">
                        <motion.div
                            className="flex  mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button className="px-8 py-3 bg-[#2f5499] text-white rounded-xl  flex items-center gap-2">
                                <HiOutlineUserCircle className="text-lg" />
                                Update Your Profile
                            </button>

                        </motion.div>
                        </Link>
                    </div>
                </motion.div>


            </div>
        </div>
    );
};

export default ViewProfile;
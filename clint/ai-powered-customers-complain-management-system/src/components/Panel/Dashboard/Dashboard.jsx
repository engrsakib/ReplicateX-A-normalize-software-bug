import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineHome,
    HiOutlineChartBar,
    HiOutlineUsers,
    HiOutlineMenuAlt2,
    HiOutlineMenu,
    HiOutlineLogout,
    HiOutlineViewGrid,
    HiOutlineUser,
    HiOutlineCog,
    HiOutlineBell,
    HiOutlineChevronRight,
    HiOutlineSearch,
    HiOutlineGlobe,
} from "react-icons/hi";
import { RiRobot2Line, RiLoader4Line } from "react-icons/ri";

const RobotThinkingLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0a0f1c] z-[100]">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
            >
                <div className="relative">
                    <RiRobot2Line className="text-[#3b82f6] w-12 h-12 md:w-20 md:h-20" />
                    <motion.div
                        className="absolute top-[35%] left-[28%] w-3 h-3 bg-[#60a5fa] rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />

                </div>
            </motion.div>

            <div className="mt-5 flex flex-col items-center space-y-3">
                <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-[#3b82f6] tracking-wider">
                        THINKING
                    </span>

                </div>

                <div className="flex space-x-3 h-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-1 bg-[#3b82f6] rounded-full"
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProfileDropdown = ({ isOpen, onClose }) => {
    const dropdownRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const menuItems = [
        { icon: <HiOutlineUser size={20} />, label: 'My Profile', action: () => navigate('/profile') },
        { icon: <HiOutlineCog size={20} />, label: 'Settings', action: () => navigate('/settings') },
        { icon: <HiOutlineLogout size={20} />, label: 'Logout', action: () => console.log('Logout Clicked') },
    ];

    if (!isOpen) return null;

    return (
        <motion.div
            ref={dropdownRef}
            className="absolute right-0 top-16 w-64 bg-[#0f172a] border border-[#1e293b] rounded-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <div className="p-4 border-b border-[#1e293b] bg-[#0b1221]">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-[#94a3b8]">admin@system.com</p>
            </div>
            <div className="py-2">
                {menuItems.map((item, index) => (
                    <button
                        key={item.label}
                        className={`flex items-center w-full px-4 py-3 text-sm text-[#cbd5e1] 
                            hover:bg-[#1e293b] hover:text-white transition-all duration-200 group
                            ${index !== menuItems.length - 1 ? 'border-b border-[#1e293b]' : ''}`}
                        onClick={() => {
                            item.action();
                            onClose();
                        }}
                    >
                        <span className="mr-3 text-[#64748b] group-hover:text-[#3b82f6] transition-colors duration-200">
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const menuItems = [
        { name: 'Admin Home', path: '/dashboard/admin-home', icon: <HiOutlineHome size={24} /> },
        { name: 'Analytics', path: '/dashboard/analytics', icon: <HiOutlineChartBar size={24} /> },
        { name: 'Users', path: '/dashboard/users', icon: <HiOutlineUsers size={24} /> },
        { name: 'Main Home', path: '/', icon: <HiOutlineGlobe size={24} /> },
    ];

    if (isLoading) return <RobotThinkingLoader />;

    return (
        <div className="flex h-screen bg-[#0a0f1c] text-gray-100 overflow-hidden font-sans">
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`fixed lg:relative z-50 h-full bg-[#0b1221] border-r border-gray-900 flex flex-col overflow-hidden`}
                initial={false}
                animate={{
                    width: isMobile ? 280 : (isSidebarOpen ? 280 : 0),
                    x: isMobile ? (isSidebarOpen ? 0 : -280) : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="w-[280px] flex flex-col h-full">
                    <div className="h-20 flex items-center px-6 border-b border-gray-900 bg-[#0b1221]">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-[#1e293b] rounded-lg">
                                <RiRobot2Line className="text-[#3b82f6] text-2xl" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                AI-<span className="text-[#3b82f6]">Powered</span>
                            </span>
                        </div>
                    </div>

                    <nav className="flex-1  py-8 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group mx-2
                                    ${isActive
                                        ? 'bg-transparent text-[#3b82f6] border border-[#3b82f6]/30'
                                        : 'text-[#94a3b8] hover:text-white hover:bg-[#131d2d]'
                                    }`
                                }
                            >
                                <span className={`mr-4 transition-transform duration-200 ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium text-sm">{item.name}</span>
                                {location.pathname === item.path && (
                                    <div className="ml-auto w-2 h-2 bg-[#3b82f6] rounded-full"></div>
                                )}
                            </NavLink>
                        ))}
                    </nav>


                </div>
            </motion.aside>

            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                <header className="h-20 flex items-center justify-between px-6 lg:px-8 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-[#1e293b] z-30 sticky top-0">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2.5 text-[#94a3b8] hover:text-white hover:bg-[#1e293b] rounded-xl transition-all duration-200 focus:outline-none"
                        >
                            {isSidebarOpen ? <HiOutlineMenuAlt2 size={26} /> : <HiOutlineMenu size={26} />}
                        </button>

                        <div className="hidden md:flex items-center text-sm text-[#94a3b8]">
                            <NavLink
                                to="/dashboard"
                                className="hover:text-[#3b82f6] transition-colors duration-200"
                            >
                                Dashboard
                            </NavLink>
                            <HiOutlineChevronRight className="mx-3 text-[#64748b]" />
                            <NavLink
                                to={location.pathname}
                                className="text-white hover:text-[#3b82f6] transition-colors duration-200 capitalize"
                            >
                                {location.pathname.split('/').pop()?.replace('-', ' ') || 'Overview'}
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="hidden md:block relative">
                            <div className="relative">
                                <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748b]" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="bg-[#0f172a] border border-[#1e293b] text-sm rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-[#3b82f6] w-72 text-gray-300 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button className="relative p-2.5 text-[#94a3b8] hover:text-white hover:bg-[#1e293b] rounded-xl transition-all duration-200">
                            <HiOutlineBell size={24} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 focus:outline-none group"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] p-0.5 group-hover:from-[#60a5fa] group-hover:to-[#3b82f6] transition-all duration-200">
                                    <div className="w-full h-full rounded-full bg-[#0a0f1c] flex items-center justify-center">
                                        <span className="text-white font-bold">A</span>
                                    </div>
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-white">Admin</p>
                                </div>
                                <HiOutlineChevronRight
                                    className={`text-[#64748b] transition-transform duration-200 ${isProfileOpen ? 'rotate-90' : ''}`}
                                    size={18}
                                />
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <ProfileDropdown
                                        isOpen={isProfileOpen}
                                        onClose={() => setIsProfileOpen(false)}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-6">
                    <div className="max-w-full mx-auto">
                        <Outlet />
                    </div>
                </main>


            </div>
        </div>
    );
};

export default Dashboard;
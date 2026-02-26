import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/pages/shared/Footer/Footer';
import Navbar from '../../components/pages/shared/Navbar/Navbar';


const Mainlayout = () => {
    const location = useLocation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    // Scroll progress calculation
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
        setShowProgress(scrollTop > 100);
    };

    // Scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', updateScrollProgress);
        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
        };
    }, []);

    // ✅ Scroll to top instantly when route changes (no over-animation)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    // ✅ Smooth, simple page transition
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    const pageTransition = {
        type: "tween",
        ease: "easeOut",
        duration: 0.4
    };

    // Scroll to top manually (button)
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='bg-[#00091a] min-h-screen text-white  overflow-x-hidden'>
            {/* Scroll progress button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showProgress ? 1 : 0, scale: showProgress ? 1 : 0 }}
                transition={{ duration: 0.3, type: "spring" }}
            >
                <motion.button
                    onClick={scrollToTop}
                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl border-2 border-blue-400/30 backdrop-blur-sm flex items-center justify-center group"
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    title="Scroll to Top"
                >
                    {/* Circular Progress SVG */}
                    <svg className="w-full h-full absolute top-0 left-0 transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#1f2937" strokeWidth="2" className="opacity-50" />
                        <motion.circle
                            cx="18" cy="18" r="16"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="100"
                            strokeDashoffset={100 - scrollProgress}
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 100 - scrollProgress }}
                            transition={{ duration: 0.1 }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Button inner content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <motion.svg
                            className="w-5 h-5 text-white mb-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ y: 0 }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                        </motion.svg>
                        <span className="text-[10px] font-semibold text-cyan-300 leading-none">
                            {Math.round(scrollProgress)}%
                        </span>
                    </div>

                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        whileHover={{
                            borderColor: "rgba(59, 130, 246, 0.5)",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.button>
            </motion.div>

            <Navbar />

            {/* ✅ Normal smooth animated page transition */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="min-h-screen"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Mainlayout;
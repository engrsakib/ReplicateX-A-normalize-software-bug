import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const OurMission = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();
    const [isLoading, setIsLoading] = useState(false); // Start with false
    const [imageLoaded, setImageLoaded] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    // Reset states when component mounts/remounts
    useEffect(() => {
        // Reset all loading states
        setIsLoading(false);
        setImageLoaded(false);
        setContentVisible(false);

        // Show content after a very short delay
        const timer = setTimeout(() => {
            setContentVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Handle image loading
    useEffect(() => {
        const img = new Image();
        img.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        img.onload = () => {
            setImageLoaded(true);
            setIsLoading(false);
        };
        img.onerror = () => {
            // If image fails to load, still show content
            setImageLoaded(true);
            setIsLoading(false);
        };
    }, []);

    useEffect(() => {
        if (isInView && contentVisible) {
            controls.start("visible");
        }
    }, [isInView, contentVisible, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    // Only show skeleton for initial page load
    const showSkeleton = isLoading && !contentVisible;

    return (
        <div className="relative overflow-hidden bg-gray-900 py-16 md:py-24">
            {showSkeleton ? (
                // Skeleton Loader
                <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Side - Image Skeleton */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/30">
                                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl">
                                    <div className="w-full h-[400px] bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 rounded-2xl animate-pulse">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content Skeleton */}
                        <div className="space-y-8">
                            <div className="text-start mb-16 space-y-4">
                                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-1/4 animate-pulse"></div>
                                <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4 animate-pulse"></div>
                                <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-full animate-pulse"></div>
                            </div>

                            {/* Mission Points Skeleton */}
                            <div className="space-y-6">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl animate-pulse"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-full animate-pulse"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-5/6 animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Actual Content
                <>
                    {/* Background Decorative Elements - Dark Theme */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full blur-3xl"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tr from-cyan-900/20 to-pink-900/20 rounded-full blur-3xl"
                    ></motion.div>

                    {/* Grid Pattern Background - Dark */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px),
                                   linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
                            backgroundSize: '50px 50px',
                        }}></div>
                    </motion.div>

                    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            ref={ref}
                            variants={containerVariants}
                            initial="hidden"
                            animate={controls}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                        >
                            {/* Left Side - Image */}
                            <motion.div
                                variants={imageVariants}
                                className="relative"
                            >
                                {/* Main Image Container */}
                                <motion.div
                                    animate={floatingAnimation}
                                    className="relative z-10"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/30">
                                        {/* Gradient Border Effect - Dark */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.3 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl blur-lg"
                                        ></motion.div>

                                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-3xl">
                                            {!imageLoaded && (
                                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900/80 rounded-2xl">
                                                    <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <img
                                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                alt="AI Customer Support"
                                                className={`w-full h-[400px] object-cover rounded-2xl brightness-90 contrast-110 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                onLoad={() => setImageLoaded(true)}
                                                loading="lazy"
                                                onError={() => setImageLoaded(true)}
                                            />
                                            {/* Image Overlay for Dark Theme */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent rounded-2xl"></div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating Elements Around Image - Dark Theme */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl rotate-12 shadow-xl shadow-blue-500/30 flex items-center justify-center"
                                >
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl -rotate-12 shadow-xl shadow-purple-500/30 flex items-center justify-center"
                                >
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {/* Right Side - Content */}
                            <motion.div variants={itemVariants} className="space-y-8">
                                <div className="text-start mb-16">
                                    <motion.div
                                        className="inline-flex items-center gap-2 mb-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3, type: "spring" }}
                                            className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                                        ></motion.div>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                                        >
                                            AI-Powered Process
                                        </motion.span>
                                    </motion.div>

                                    <motion.h2
                                        className="text-3xl max-sm:text-2xl font-bold text-white tracking-tight mb-6"
                                        initial={{ y: -20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                            Transforming Customer
                                        </span>{' '}
                                        Experience with AI
                                    </motion.h2>

                                    <motion.p
                                        className="mt-4 text-xl text-gray-300 font-light max-w-2xl"
                                        initial={{ y: -20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Everything you need to master complaint resolution with intelligent automation
                                    </motion.p>
                                </div>

                                {/* Mission Points - Dark Theme */}
                                <motion.div
                                    variants={containerVariants}
                                    className="space-y-6"
                                >
                                    {[
                                        {
                                            icon: '🤖',
                                            title: 'AI-Powered Resolution',
                                            description: 'Leverage cutting-edge artificial intelligence to automatically analyze, categorize, and resolve customer complaints with unprecedented accuracy.'
                                        },
                                        {
                                            icon: '📈',
                                            title: 'Data-Driven Insights',
                                            description: 'Transform complaints into actionable business intelligence that drives improvement and fosters customer loyalty.'
                                        },
                                        {
                                            icon: '⚡',
                                            title: 'Real-Time Processing',
                                            description: 'Handle customer concerns instantly with our 24/7 automated system, reducing resolution time by up to 70%.'
                                        },
                                    ].map((point, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group flex items-start space-x-4 p-5 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer"
                                        >
                                            {/* Icon - Dark Theme */}
                                            <motion.div
                                                whileHover={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-700 group-hover:border-blue-400"
                                            >
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                                    className="text-2xl"
                                                >
                                                    {point.icon}
                                                </motion.span>
                                            </motion.div>

                                            {/* Content - Dark Theme */}
                                            <div>
                                                <motion.h3
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                                    className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors"
                                                >
                                                    {point.title}
                                                </motion.h3>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                                    className="text-gray-400 group-hover:text-gray-300"
                                                >
                                                    {point.description}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurMission;
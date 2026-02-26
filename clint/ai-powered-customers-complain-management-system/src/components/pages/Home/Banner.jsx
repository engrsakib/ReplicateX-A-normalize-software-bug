import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const LoadingSkeleton = () => (
    <div className="w-full mt-6 bg-transparent text-white py-10 md:py-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left side skeleton */}
                <div className="w-full space-y-10 md:w-1/2">
                    <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mb-6 animate-pulse"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg w-4/6 animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <div className="w-32 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
                        <div className="w-28 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                </div>

                {/* Right side skeleton */}
                <div className="w-full md:w-[700px]">
                    <div className="w-full md:h-[550px] h-64 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const Banner = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        import("../../../../public/lottie/Administrao.json")
            .then(data => {
                setAnimationData(data.default);
            })
            .catch(err => {
                console.error("Error loading animation:", err);
            });

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="w-full mt-6 bg-transparent text-white py-20 md:py-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <motion.div
                        className="w-full space-y-10 md:w-1/2 text-start md:text-left"
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <div className="space-y-4">
                            <motion.div
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-green-400">
                                    AI Complaint Management Platform
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-3xl md:text-5xl font-bold mb-4"
                                initial={{ y: -30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                Intelligent Grievance{' '}
                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    Handling
                                </span>
                                ,
                                Guaranteed{' '}
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Loyalty
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            className="text-lg md:text-xl text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Transform customer complaints into loyalty opportunities with AI-powered sentiment analysis, automated routing, and intelligent resolution tracking for exceptional customer experience.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            <motion.button
                                className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 relative overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Analyzing Complaints
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 rounded-lg font-semibold border border-green-400 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    View Platform Demo
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex flex-wrap gap-6 pt-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-400">98%</div>
                                <div className="text-sm text-gray-400">Satisfaction Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">60%</div>
                                <div className="text-sm text-gray-400">Faster Resolution</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                                <div className="text-sm text-gray-400">Complaints Analyzed</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-full md:w-[700px] relative"
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

                        {/* Animation container */}
                        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-4">
                            {animationData && (
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    className="w-full md:h-[500px] h-64"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
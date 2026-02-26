import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaClock, FaTag, FaRocket } from 'react-icons/fa';

// Loading skeleton component
const LoadingSkeleton = () => (
    <div className="w-full bg-transparent py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
                <div className="h-14 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg max-w-xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg max-w-md mx-auto animate-pulse"></div>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse h-64"
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full mb-6"></div>
                        <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg w-3/4 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg w-5/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 18,
        },
    },
};

const cardHover = {
    y: -8,
    borderColor: "rgba(52, 211, 153, 0.5)",
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.3
    },
};

const Featured = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            title: 'Real-time Sentiment Analysis',
            description: 'Instantly gauge customer emotion and urgency across all communication channels to prioritize critical issues.',
            icon: FaChartBar,
            color: 'from-emerald-400 to-cyan-400', // Adjusted color for icon hover state
            delay: 0.1
        },
        {
            title: 'Smart Ticket Prioritization',
            description: 'Automatically assign severity and route tickets to the right agent, eliminating manual sorting and improving response time.',
            icon: FaClock,
            color: 'from-blue-400 to-indigo-400',
            delay: 0.2
        },
        {
            title: 'Root Cause Detection',
            description: 'AI analyzes patterns in historical data to identify and suggest fixes for underlying problems, preventing repeat complaints.',
            icon: FaTag,
            color: 'from-violet-400 to-purple-400',
            delay: 0.3
        },
        {
            title: 'Performance Acceleration',
            description: 'Boost agent efficiency with suggested responses and a unified dashboard, leading to faster and consistent resolution.',
            icon: FaRocket,
            color: 'from-teal-400 to-emerald-400',
            delay: 0.4
        },
    ];

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <section className="w-full bg-transparent py-24 overflow-hidden text-white">

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                        <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            AI-Powered Solutions
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Powerful
                        </span>{' '}
                        AI-Driven Features
                    </motion.h2>

                    <motion.p
                        className="mt-4 text-xl text-gray-300 font-light max-w-2xl mx-auto"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Everything you need to master complaint resolution with intelligent automation
                    </motion.p>
                </div>

                <motion.div
                    className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={cardHover}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm transition-all duration-300 cursor-pointer 
 border border-gray-700 hover:border-emerald-500/50 h-full flex flex-col justify-start overflow-hidden"
                            style={{ transitionDelay: `${feature.delay}s` }}
                        >

                            {/* Icon without animated glow background */}
                            <div className="relative mb-6">
                                {/* Removed the motion.div for the glow/blur effect */}
                                <motion.div
                                    className="relative p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    whileHover={{ rotate: 5 }}
                                >
                                    <feature.icon className="w-7 h-7 text-emerald-400" />
                                </motion.div>
                            </div>

                            {/* Title with gradient text on hover */}
                            <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-base flex-grow leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                {feature.description}
                            </p>

                            {/* Animated indicator line */}
                            <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-gray-700 to-gray-600 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                                    initial={{ width: "0%" }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />
                            </div>

                            {/* Hover indicator (kept this small dot, but animation is clean) */}
                            <AnimatePresence>
                                {hoveredCard === index && (
                                    <motion.div
                                        className="absolute top-6 right-6"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold text-base overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Explore Features
                            <motion.svg
                                className="w-4 h-4"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </motion.svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Featured;
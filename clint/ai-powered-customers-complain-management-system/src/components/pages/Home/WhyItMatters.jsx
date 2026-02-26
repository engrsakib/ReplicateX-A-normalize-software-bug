import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCheckCircle,
    FaStar,
    FaTachometerAlt,
    FaChartLine,
    FaRobot,
    FaHeadset,
    FaLightbulb,
    FaArrowRight
} from 'react-icons/fa';

// --- Framer Motion Variants ---
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

const textItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 18,
        },
    },
};

const metricItemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
        },
    },
};

// Loading skeleton component
const LoadingSkeleton = () => (
    <div className="w-full bg-transparent py-24 overflow-hidden text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left column skeleton */}
                <div>
                    <div className="h-14 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mb-6 animate-pulse"></div>
                    <div className="h-24 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mb-8 animate-pulse"></div>
                    <div className="space-y-4 mb-10">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center">
                                <div className="w-5 h-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mr-3 animate-pulse"></div>
                                <div className="h-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg w-3/4 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                    <div className="h-12 w-40 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg animate-pulse"></div>
                </div>

                {/* Right column skeleton */}
                <div className="grid grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-40 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const WhyItMatters = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredMetric, setHoveredMetric] = useState(null);

    // Modern color palette - gradients without shadows
    const colorPalette = {
        primary: 'from-emerald-500 to-cyan-400',
        secondary: 'from-blue-500 to-indigo-400',
        accent: 'from-violet-500 to-purple-400',
        neutral: 'from-slate-700 to-slate-600',
        success: 'from-teal-500 to-emerald-400',
        dark: 'from-gray-900 to-gray-800'
    };

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Content tailored for AI Complaint Management
    const benefits = [
        'Reduce resolution time by up to 60% with AI automation',
        'Identify complaint trends and root causes proactively',
        'Empower agents with AI-driven actionable insights',
        'Gain qualitative data for service improvement and strategy',
    ];

    const metrics = [
        {
            value: '60%',
            label: 'Faster Resolution',
            icon: FaTachometerAlt,
            bgColor: colorPalette.primary,
            desc: 'AI-powered automation'
        },
        {
            value: '98%',
            label: 'Customer Satisfaction',
            icon: FaStar,
            bgColor: colorPalette.success,
            desc: 'Improved experience'
        },
        {
            value: '10K+',
            label: 'Complaints Analyzed',
            icon: FaChartLine,
            bgColor: colorPalette.secondary,
            desc: 'Daily processing capacity'
        },
        {
            value: '4.9/5',
            label: 'Platform Rating',
            icon: FaStar,
            bgColor: colorPalette.accent,
            desc: 'User satisfaction score'
        },
    ];

    const features = [
        { icon: FaRobot, text: 'AI-Powered Analysis', color: 'text-cyan-400' },
        { icon: FaHeadset, text: '24/7 Support', color: 'text-emerald-400' },
        { icon: FaLightbulb, text: 'Smart Insights', color: 'text-violet-400' },
    ];

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <section className="w-full bg-transparent py-24 overflow-hidden text-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Decorative elements */}
                <div className="absolute right-0 top-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

                <motion.div
                    className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Left Column: Text and Benefits */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <motion.div
                                className="w-2 h-10 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"
                                initial={{ height: 0 }}
                                animate={{ height: 40 }}
                                transition={{ delay: 0.5 }}
                            />
                            <motion.span
                                className="text-emerald-400 font-semibold tracking-wider uppercase text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                AI Complaint Management
                            </motion.span>
                        </div>

                        <motion.h2
                            className="text-4xl max-sm:text-3xl font-bold text-white mb-6 leading-tight"
                            variants={textItemVariants}
                        >
                            Transform Your{' '}
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Customer Experience
                            </span>
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
                            variants={textItemVariants}
                        >
                            Leverage cutting-edge AI to transform complaints into opportunities for growth, loyalty, and continuous improvement.
                        </motion.p>

                        {/* Feature badges */}
                        <motion.div
                            className="flex flex-wrap gap-4 mb-10"
                            variants={textItemVariants}
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
                                >
                                    <feature.icon className={`${feature.color}`} />
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Benefit List */}
                        <ul className="space-y-5 mb-12">
                            {benefits.map((benefit, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start text-lg"
                                    variants={textItemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="relative mr-4 mt-1">
                                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
                                        <FaCheckCircle className="relative text-emerald-400 w-6 h-6 flex-shrink-0" />
                                    </div>
                                    <span className="text-gray-200">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Call to Action Button */}
                        <motion.button
                            className="group relative px-8 py-4 rounded-lg overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg"
                            variants={textItemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Free Trial
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                    </div>

                    {/* Right Column: Key Metrics (KPIs) */}
                    <div className="relative z-10">
                        <div className="grid grid-cols-2 gap-5">
                            <AnimatePresence>
                                {metrics.map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        className={`relative p-6 rounded-2xl bg-gradient-to-br ${metric.bgColor} h-48 flex flex-col justify-center items-center cursor-pointer`}
                                        variants={metricItemVariants}
                                        whileHover={{
                                            y: -8,
                                            transition: { type: "spring", stiffness: 300, damping: 15 }
                                        }}
                                        onHoverStart={() => setHoveredMetric(index)}
                                        onHoverEnd={() => setHoveredMetric(null)}
                                        animate={hoveredMetric === index ? { scale: 1.03 } : { scale: 1 }}
                                    >
                                        {/* Hover effect overlay */}
                                        <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                                        {/* Icon */}
                                        <motion.div
                                            className="mb-4 text-3xl"
                                            animate={hoveredMetric === index ? { rotate: [0, 10, -10, 0] } : {}}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <metric.icon />
                                        </motion.div>

                                        {/* Metric value */}
                                        <motion.div
                                            className="text-4xl font-bold mb-2"
                                            animate={hoveredMetric === index ? { scale: 1.1 } : { scale: 1 }}
                                        >
                                            {metric.value}
                                        </motion.div>

                                        {/* Metric label */}
                                        <motion.p
                                            className="text-sm font-medium text-gray-100 uppercase tracking-wider text-center mb-1"
                                            animate={hoveredMetric === index ? { y: -5 } : { y: 0 }}
                                        >
                                            {metric.label}
                                        </motion.p>

                                        {/* Description on hover */}
                                        <AnimatePresence>
                                            {hoveredMetric === index && (
                                                <motion.p
                                                    className="text-xs text-gray-200 text-center mt-2"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    {metric.desc}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Stats note */}
                        <motion.div
                            className="mt-8 p-6 rounded-xl border border-gray-700 bg-gray-900/30 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <p className="text-gray-400 text-sm text-center">
                                <span className="text-emerald-400 font-semibold">Real-time AI analysis</span> processing thousands of customer interactions daily to drive meaningful insights
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyItMatters;
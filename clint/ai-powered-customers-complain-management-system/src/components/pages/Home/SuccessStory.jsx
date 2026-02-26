/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaArrowRight, FaUsers, FaGraduationCap, FaChalkboardTeacher, FaCode, FaRobot, FaChartLine, FaShieldAlt, FaCogs } from 'react-icons/fa';

// Loading Skeleton Component
const LoadingSkeleton = () => (
    <div className="relative px-4 py-24 overflow-hidden bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-[1700px] mx-auto">
            <div className="mb-16 text-center">
                <div className="max-w-xl mx-auto mb-4 rounded-lg h-14 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"></div>
                <div className="h-6 max-w-lg mx-auto rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"></div>
            </div>
             {/* Skeleton content... (kept same as yours) */}
            <div className="mb-12">
                <div className="flex gap-8">
                     {[1, 2, 3, 4].map((item) => (
                        <div key={`skel-${item}`} className="flex-shrink-0 h-64 w-96 bg-gray-800/50 rounded-3xl animate-pulse"></div>
                     ))}
                </div>
            </div>
        </div>
    </div>
);

// Testimonials Data
const testimonials = [
    {
        name: 'Sarah Johnson',
        text: 'AI Campaign Pro has revolutionized our marketing strategy. Customer engagement increased by 187% within just 3 months.',
        banglaText: 'AI Campaign Pro আমাদের মার্কেটিং কৌশলে বিপ্লব এনেছে। মাত্র ৩ মাসের মধ্যে গ্রাহকদের অংশগ্রহণ ১৮৭% বৃদ্ধি পেয়েছে।',
        avatar: 'https://i.ibb.co.com/5YqXZ7t/avatar1.jpg',
        role: 'Marketing Director',
        company: 'TechGrowth Inc.'
    },
    {
        name: 'David Chen',
        text: 'The AI-powered analytics helped us reduce customer churn by 42%. The predictive campaign management is a game-changer.',
        banglaText: 'AI-চালিত বিশ্লেষণ আমাদের গ্রাহক হারানো ৪২% কমাতে সাহায্য করেছে। ভবিষ্যদ্বাণীমূলক প্রচারণা ব্যবস্থাপনা একটি গেম-চেঞ্জার।',
        avatar: 'https://i.ibb.co.com/0jq8Q9L/avatar2.jpg',
        role: 'Head of Customer Success',
        company: 'Global Solutions Ltd.'
    },
    {
        name: 'Priya Sharma',
        text: 'Our ROI improved by 300% after implementing AI Campaign Pro. The automated customer segmentation is incredibly accurate.',
        banglaText: 'AI Campaign Pro বাস্তবায়নের পর আমাদের ROI ৩০০% উন্নত হয়েছে। স্বয়ংক্রিয় গ্রাহক বিভাজন অবিশ্বাস্যরকম সঠিক।',
        avatar: 'https://i.ibb.co.com/7QX9rRt/avatar3.jpg',
        role: 'Digital Strategy Lead',
        company: 'Innovate Digital'
    },
    {
        name: 'Michael Rodriguez',
        text: 'The AI-driven campaign optimization increased our conversion rates by 156%. Best investment we made this year.',
        banglaText: 'AI-চালিত প্রচারণা অপ্টিমাইজেশন আমাদের কনভার্সন রেট ১৫৬% বাড়িয়েছে। এ বছর আমাদের করা শ্রেষ্ঠ বিনিয়োগ।',
        avatar: 'https://i.ibb.co.com/4T2N1rG/avatar4.jpg',
        role: 'Growth Manager',
        company: 'ScaleFast Enterprises'
    },
    {
        name: 'Emma Williams',
        text: 'Customer retention improved by 65% using AI-powered personalized campaigns. The platform learns and adapts beautifully.',
        banglaText: 'AI-চালিত ব্যক্তিগতকৃত প্রচারণা ব্যবহার করে গ্রাহক ধরে রাখার হার ৬৫% উন্নত হয়েছে। প্ল্যাটফর্মটি চমৎকারভাবে শিখতে ও খাপ খাইয়ে নিতে পারে।',
        avatar: 'https://i.ibb.co.com/0C3n9Qv/avatar5.jpg',
        role: 'Customer Experience Director',
        company: 'Premium Retail Group'
    },
    {
        name: 'James Wilson',
        text: 'Cut campaign management time by 70% while increasing effectiveness. The AI suggestions are always spot-on.',
        banglaText: 'কার্যকারিতা বাড়ানোর সময় প্রচারণা ব্যবস্থাপনার সময় ৭০% কমানো হয়েছে। AI পরামর্শ সবসময় সঠিক হয়।',
        avatar: 'https://i.ibb.co.com/F8RzLbX/avatar6.jpg',
        role: 'Operations Head',
        company: 'SmartCommerce'
    },
    {
        name: 'Lisa Wang',
        text: 'Multi-channel campaign coordination became effortless. Our customer satisfaction scores reached all-time highs.',
        banglaText: 'মাল্টি-চ্যানেল প্রচারণা সমন্বয় নিঃসন্দেহে হয়ে গেছে। আমাদের গ্রাহক সন্তুষ্টি স্কোর সর্বোচ্চ স্তরে পৌঁছেছে।',
        avatar: 'https://i.ibb.co.com/1qY3nG3/avatar7.jpg',
        role: 'Brand Manager',
        company: 'Luxe Brands International'
    },
    {
        name: 'Robert Kim',
        text: 'The predictive customer behavior modeling helped us launch perfectly timed campaigns. Revenue grew by 89% this quarter.',
        banglaText: 'ভবিষ্যদ্বাণীমূলক গ্রাহক আচরণ মডেলিং আমাদের নিখুঁত সময়ে প্রচারণা শুরু করতে সাহায্য করেছে। এই কোয়ার্টারে রাজস্ব ৮৯% বৃদ্ধি পেয়েছে।',
        avatar: 'https://i.ibb.co.com/6YKjq2S/avatar8.jpg',
        role: 'Revenue Director',
        company: 'NextGen Tech'
    },
    {
        name: 'Sophia Martinez',
        text: 'AI-powered A/B testing gave us insights we never had before. Campaign performance improved dramatically across all metrics.',
        banglaText: 'AI-চালিত A/B টেস্টিং আমাদের আগে কখনও ছিল না এমন অন্তর্দৃষ্টি দিয়েছে। সমস্ত মেট্রিক্স জুড়ে প্রচারণার কার্যকারিতা নাটকীয়ভাবে উন্নত হয়েছে।',
        avatar: 'https://i.ibb.co.com/9wH8L7M/avatar9.jpg',
        role: 'Product Marketing Lead',
        company: 'CloudScale Solutions'
    },
    {
        name: 'Ahmed Hassan',
        text: 'Automated campaign reporting saved us 40 hours per week. The AI insights helped optimize our budget allocation perfectly.',
        banglaText: 'স্বয়ংক্রিয় প্রচারণা রিপোর্টিং আমাদের প্রতি সপ্তাহে ৪০ ঘন্টা বাঁচিয়েছে। AI অন্তর্দৃষ্টি আমাদের বাজেট বরাদ্দ নিখুঁতভাবে অপ্টিমাইজ করতে সাহায্য করেছে।',
        avatar: 'https://i.ibb.co.com/7C8p8wN/avatar10.jpg',
        role: 'Financial Controller',
        company: 'Middle East Commerce Hub'
    },
];

// Testimonial Card Component
const TestimonialCard = ({ item, showBangla }) => (
    <motion.div
        className="relative flex-shrink-0 p-6 transition-all duration-300 border rounded-2xl w-80 border-gray-700/50 bg-gradient-to-b from-gray-900/60 to-gray-800/40 backdrop-blur-sm hover:border-blue-500/50 group"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
        <div className="absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        <div className="flex items-center mb-5">
            <div className="relative">
                <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 border-2 rounded-full border-blue-500/30"
                />
                <div className="absolute w-4 h-4 bg-blue-500 border-2 border-gray-900 rounded-full -bottom-1 -right-1"></div>
            </div>
            <div className="ml-4">
                <h4 className="text-base font-bold text-white">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.role}</p>
                <p className="text-xs text-gray-500">{item.company}</p>
            </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-gray-300 line-clamp-4">
            "{showBangla ? item.banglaText : item.text}"
        </p>

        <div className="flex items-center justify-between">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, j) => (
                    <motion.div
                        key={j}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaStar size={12} />
                    </motion.div>
                ))}
            </div>
            <div className="text-xs font-medium text-blue-400">
                AI-Powered Results
            </div>
        </div>
    </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className="mb-2 text-4xl font-bold text-white">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const SuccessStory = () => {
    // Refs for width calculation removed as we use percentages now
    const [isLoading, setIsLoading] = useState(true);
    const [showBangla, setShowBangla] = useState(false);
    
    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="relative py-24 overflow-hidden text-white bg-gradient-to-b from-gray-950 to-black">
            {/* Background Effects... */}
            <div className="absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-gray-950 via-gray-950/50 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 z-10 w-32 bg-gradient-to-l from-gray-950 via-gray-950/50 to-transparent"></div>
            
             {/* Animated Border Glow */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 border-2 border-transparent rounded-3xl"
                    style={{
                        boxShadow: `
                            inset 0 0 60px rgba(59, 130, 246, 0.1),
                            inset 0 0 100px rgba(59, 130, 246, 0.05),
                            0 0 100px rgba(59, 130, 246, 0.1)
                        `
                    }}
                ></div>
            </div>

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute rounded-full top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl animate-pulse"></div>
                <div className="absolute rounded-full bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-[1700px] mx-auto px-4 md:px-6 relative z-20">
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <motion.div
                        className="inline-flex items-center gap-3 px-5 py-2 mb-6 border border-gray-700 rounded-full bg-gray-800/50"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-400">Success Stories</span>
                    </motion.div>

                    <motion.h2
                        className="mb-6 text-3xl font-bold text-white md:text-5xl"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Transform Your Campaigns with{' '}
                        <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                            AI Intelligence
                        </span>
                    </motion.h2>

                    <motion.p
                        className="max-w-4xl mx-auto mt-4 text-lg leading-relaxed text-gray-300 md:text-xl"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Discover how leading companies are using AI-powered campaign management...
                    </motion.p>

                    {/* Language Toggle */}
                    <div className="flex justify-center mt-8">
                        <div className="inline-flex items-center gap-2 p-1 border border-gray-700 rounded-full bg-gray-800/50">
                            <button
                                onClick={() => setShowBangla(false)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!showBangla ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setShowBangla(true)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${showBangla ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                বাংলা
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2 lg:grid-cols-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { icon: FaRobot, value: 187, label: 'Avg. Engagement Increase', suffix: '%', color: 'from-blue-500 to-cyan-500' },
                        { icon: FaChartLine, value: 156, label: 'Conversion Rate Growth', suffix: '%', color: 'from-indigo-500 to-purple-500' },
                        { icon: FaShieldAlt, value: 42, label: 'Customer Churn Reduction', suffix: '%', color: 'from-green-500 to-emerald-500' },
                        { icon: FaCogs, value: 70, label: 'Time Saved on Campaigns', suffix: '%', color: 'from-orange-500 to-red-500' },
                    ].map((stat, index) => (
                        <div key={index} className="relative group">
                            <div className="relative p-6 transition-all duration-300 border rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/30">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="mb-2">
                                    <AnimatedCounter end={stat.value} duration={2.5} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Testimonials Carousel Container */}
                <div className="relative space-y-8">
                    
                    {/* --- Top Row: LEFT TO RIGHT Animation --- */}
                    <div className="relative py-4 overflow-hidden group">
                        <div className="absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent"></div>
                        <div className="absolute top-0 bottom-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent"></div>

                        <motion.div
                            className="flex items-start gap-6 w-max"
                            // -50% থেকে 0% এ যাবে (Left to Right)
                            initial={{ x: "-50%" }}
                            animate={{ x: "0%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 40, // স্পিড কন্ট্রোল করতে এই ভ্যালু পরিবর্তন করুন
                            }}
                            // হোভার করলে থামবে
                            whileHover={{ animationPlayState: "paused" }} 
                        >
                            {/* ডাটা ডুপ্লিকেট করা হয়েছে যাতে লুপ স্মুথ হয় */}
                            {[...testimonials, ...testimonials].map((item, i) => (
                                <TestimonialCard
                                    key={`top-${i}`}
                                    item={item}
                                    showBangla={showBangla}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* --- Bottom Row: RIGHT TO LEFT Animation --- */}
                    <div className="relative py-4 overflow-hidden group">
                        <div className="absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent"></div>
                        <div className="absolute top-0 bottom-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent"></div>

                        <motion.div
                            className="flex items-start gap-6 w-max"
                            // 0% থেকে -50% এ যাবে (Right to Left)
                            initial={{ x: "0%" }}
                            animate={{ x: "-50%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 40, // স্পিড কন্ট্রোল করতে এই ভ্যালু পরিবর্তন করুন
                            }}
                             // হোভার করলে থামবে
                             whileHover={{ animationPlayState: "paused" }} 
                        >
                            {[...testimonials, ...testimonials].map((item, i) => (
                                <TestimonialCard
                                    key={`bottom-${i}`}
                                    item={item}
                                    showBangla={showBangla}
                                />
                            ))}
                        </motion.div>
                    </div>

                </div>

                {/* CTA Section */}
                <motion.div
                    className="relative mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
                    <div className="relative">
                        <h3 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                            Ready to Transform Your Campaign Strategy?
                        </h3>
                        <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                            Join hundreds of successful companies using AI-powered campaign management...
                        </p>
                        <motion.button
                            className="relative px-10 py-4 overflow-hidden text-lg font-semibold text-white group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Start Your AI Transformation Journey
                                <FaArrowRight className="transition-transform group-hover:translate-x-2" />
                            </span>
                        </motion.button>
                        <p className="mt-6 text-sm text-gray-500">
                            Book a personalized demo • 30-day free trial • No credit card required
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SuccessStory;
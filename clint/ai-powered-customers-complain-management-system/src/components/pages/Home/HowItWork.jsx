import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSearch, FaCommentDots, FaArrowRight } from 'react-icons/fa';

const LoadingSkeleton = () => (
    <div className="w-full bg-transparent py-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <div className="h-12 bg-gray-800 rounded-lg max-w-md mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-800 rounded-lg max-w-sm mx-auto animate-pulse"></div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="p-8 rounded-xl bg-gray-800 animate-pulse h-72"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gray-700 rounded-lg mr-4"></div>
                            <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                        </div>
                        <div className="h-7 bg-gray-700 rounded-lg w-2/3 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded-lg"></div>
                            <div className="h-4 bg-gray-700 rounded-lg w-5/6"></div>
                            <div className="h-4 bg-gray-700 rounded-lg w-4/6"></div>
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
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const cardHover = {
    borderColor: "rgb(52, 211, 153)",
    y: -5,
    transition: { duration: 0.3 }
};

const iconHover = {
    scale: 1.1,
    rotate: 5,
};

const HowItWork = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const steps = [
        {
            id: '01',
            title: 'Receive & Analyze',
            description: 'AI instantly captures and analyzes complaints from all channels (email, social, chat) to determine sentiment and urgency.',
            icon: FaRobot,
        },
        {
            id: '02',
            title: 'Intelligent Routing',
            description: 'Complaints are automatically categorized, tagged, and routed to the specialized agent or department for quick action.',
            icon: FaSearch,
        },
        {
            id: '03',
            title: 'Automated Resolution',
            description: 'AI suggests the best solution, auto-drafts responses, and learns from every interaction to continuously improve resolution rates.',
            icon: FaCommentDots,
        },
        {
            id: '04',
            title: 'Automated Resolution',
            description: 'AI suggests the best solution, auto-drafts responses, and learns from every interaction to continuously improve resolution rates.',
            icon: FaCommentDots,
        },
    ];

    if (isLoading) {
        return <LoadingSkeleton />;
    }


    return (
        <section className="w-full bg-transparent py-24 overflow-hidden text-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
                            AI-Powered Process
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
                            How It's
                        </span>{' '}
                        Works
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
                    className="grid gap-8 lg:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            variants={itemVariants}
                            whileHover={cardHover}
                            className="relative p-8 rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm 
                                border border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer group"
                        >

                            <div className="flex items-center gap-4 mb-5">
                                <motion.div
                                    className="p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700"
                                    whileHover={iconHover}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <step.icon className="w-8 h-8 text-green-400" />
                                </motion.div>


                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">
                                {step.title}
                            </h3>

                            <p className="text-gray-400 text-base mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                {step.description}
                            </p>

                            <div className="flex items-center text-green-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                <span>Learn more</span>
                                <FaArrowRight className="ml-3 group-hover:ml-4 transition-all duration-300" />
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300">
                        Get Started Today
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default HowItWork;
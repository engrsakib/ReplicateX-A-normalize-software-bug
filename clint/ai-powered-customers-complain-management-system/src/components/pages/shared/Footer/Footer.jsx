import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaRegEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const socialHover = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 400, damping: 10 } }
};

const linkSlideHover = {
    hover: { x: 5, transition: { type: "spring", stiffness: 300 } }
};

const Footer = () => {
    const headerStyle = "text-xl font-bold text-green-400 mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-green-500";
    const linkStyle = "text-gray-400 hover:text-green-400 transition duration-300 cursor-pointer text-sm block py-1";
    const contactIconBg = "bg-gray-700/50 p-2 rounded-lg text-green-400";
    const contactTextStyle = "text-gray-400 text-sm";

    const quickLinks = [
        { name: 'Features', path: '/features' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Why Choose Us', path: '/why-choose-us' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Success Stories', path: '/stories' }
    ];

    const resources = [
        { name: 'Blog', path: '/blog' },
        { name: 'Study Tips', path: '/tips' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Support Center', path: '/support' },
        { name: 'Admin-login', path: '/admin-login' }
    ];

    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' }
    ];

    return (
        <motion.footer
            className="w-full bg-transparent text-white pt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 pt-8">

                    {/* Logo and Description */}
                    <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center mb-6">
                            <img className='w-32 -mt-5' src="/logo/download.png" alt="Logo" />
                        </Link>
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Transform your academic goals with AI-powered insights. Achieve mastery through data-driven, strategic preparation.
                        </p>
                        <div className="flex space-x-4 mt-8">
                            {[
                                { Icon: FaFacebookF, url: "https://facebook.com" },
                                { Icon: FaTwitter, url: "https://twitter.com" },
                                { Icon: FaLinkedinIn, url: "https://linkedin.com" },
                                { Icon: FaInstagram, url: "https://instagram.com" }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-800 text-gray-300 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                                    variants={socialHover}
                                    whileHover="hover"
                                >
                                    <item.Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Quick Links</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <motion.li key={index} whileHover="hover">
                                    <Link to={link.path}>
                                        <motion.span className={linkStyle} variants={linkSlideHover}>
                                            {link.name}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Resources</h3>
                        <ul className="space-y-4">
                            {resources.map((link, index) => (
                                <motion.li key={index} whileHover="hover">
                                    <Link to={link.path}>
                                        <motion.span className={linkStyle} variants={linkSlideHover}>
                                            {link.name}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Us */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Contact Us</h3>
                        <div className="space-y-5">
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaMapMarkerAlt className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Office Address</p>
                                    <span className={contactTextStyle}>Bogra, Rajshahi Division, Bangladesh</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaRegEnvelope className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Email Us</p>
                                    <span className={contactTextStyle}>info@mcqanalysisbd.com</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaPhoneAlt className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Call Us</p>
                                    <span className={contactTextStyle}>+880 123 456 7890</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 text-center md:text-left">
                        <p className="mb-3 md:mb-0">
                            &copy; 2026 AI Powered Management. All rights reserved. Made with <span className="text-red-500">❤️</span> in Bangladesh
                        </p>
                        <div className="flex space-x-6">
                            {legalLinks.map((link, index) => (
                                <Link key={index} to={link.path} className="hover:text-green-400 transition duration-300">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
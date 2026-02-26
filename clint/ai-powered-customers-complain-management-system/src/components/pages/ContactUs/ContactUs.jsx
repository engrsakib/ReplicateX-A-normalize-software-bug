import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactBanner from './ContactBanner';

const ContactUs = () => {
    return (
        <>
            <ContactBanner></ContactBanner>
            <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
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
                                Get In Touch
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
                                Contact
                            </span>{' '}
                            Us
                        </motion.h2>

                        <motion.p
                            className="mt-4 text-xl text-gray-300 font-light max-w-2xl mx-auto"
                            initial={{ y: -20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Map & Contact Info */}
                        <div className="space-y-8">
                            {/* Map Section */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <div className="h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-1">
                                    <iframe
                                        title="Magura Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.82239243734!2d89.34729812417605!3d23.42205397112684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ffc1cae7a4e59f%3A0xe44c1d2d0c8d0f21!2sMagura%20District%2C%20Khulna%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, borderRadius: '16px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="rounded-xl"
                                    ></iframe>
                                </div>
                                <div className="bg-gray-900/50 backdrop-blur-sm p-6 border-t border-emerald-500/20">
                                    <div className="flex items-center gap-3">
                                        <FaMapMarkerAlt className="text-emerald-400 text-xl" />
                                        <div>
                                            <h3 className="text-white font-semibold">Our Location</h3>
                                            <p className="text-gray-300">Magura, Khulna, Bangladesh</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {/* Phone */}
                                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl">
                                            <FaPhone className="text-emerald-400 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">Phone Call</h3>
                                            <p className="text-gray-300 text-lg font-medium">+880 1234 567890</p>
                                            <p className="text-sm text-gray-400 mt-2">Available 24/7 for emergency</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl">
                                            <FaWhatsapp className="text-emerald-400 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
                                            <p className="text-gray-300 text-lg font-medium">+880 1234 567890</p>
                                            <p className="text-sm text-gray-400 mt-2">Quick response via WhatsApp</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl">
                                            <FaEnvelope className="text-emerald-400 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">Email</h3>
                                            <p className="text-gray-300 text-lg font-medium">info@example.com</p>
                                            <p className="text-sm text-gray-400 mt-2">For general inquiries</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl">
                                            <FaClock className="text-emerald-400 text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">Working Hours</h3>
                                            <p className="text-gray-300 text-lg font-medium">9:00 AM - 6:00 PM</p>
                                            <p className="text-sm text-gray-400 mt-2">Monday to Friday</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-8 rounded-3xl border border-emerald-500/10 shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                                        placeholder="+880 1234 567890"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows="5"
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-emerald-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                                    type="submit"
                                >
                                    Send Message
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-gray-400 text-sm">
                                We'll get back to you within 24 hours
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ContactUs;
import React from 'react';

const ContactBanner = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[350px] lg:h-[450px] md:mt-10 mt-16 overflow-hidden bg-[#0a0a0f]">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950/30"></div>
            
            {/* Animated Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-5%] w-[40%] h-[60%] bg-blue-600/10 rounded-full blur-[100px]"></div>

            {/* Micro Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '45px 45px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}
            ></div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
                
                {/* Breadcrumb - Sleek Design */}
                <nav className="flex items-center space-x-2 text-sm max-sm:mb-4">
                    <a href="/" className="text-slate-500 hover:text-white transition-colors">Home</a>
                    <span className="text-slate-700">/</span>
                    <span className="text-emerald-400 font-semibold uppercase tracking-widest text-[11px]">
                        Get In Touch
                    </span>
                </nav>

                <div className="grid lg:grid-cols-2 items-center gap-12">
                    {/* Text Content */}
                    <div className="space-y-5">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] text-emerald-300 uppercase tracking-[0.2em] font-bold">We are Online</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                            Let’s start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Conversation.</span>
                        </h1>
                        
                        <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                            Have a question or need technical support? Our dedicated team is here to help you 24/7.
                        </p>
                    </div>

                    {/* Right Side Visual Element - Communication focus */}
                    <div className="hidden lg:flex justify-end relative">
                        <div className="relative w-80 h-80">
                            {/* Decorative Rotating Ring */}
                            <div className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full animate-[spin_15s_linear_infinite]"></div>
                            
                            {/* Floating Message Cards */}
                            <div className="absolute top-10 right-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl -rotate-12 hover:rotate-0 transition-all duration-500">
                                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>

                            <div className="absolute bottom-10 left-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl rotate-12 hover:rotate-0 transition-all duration-500">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>

                            {/* Center Support Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 p-10 rounded-full border border-white/10 shadow-inner">
                                    <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        </div>
    );
};

export default ContactBanner;
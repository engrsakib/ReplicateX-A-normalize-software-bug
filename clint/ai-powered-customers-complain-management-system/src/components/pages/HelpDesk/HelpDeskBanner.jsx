import React from 'react';

const HelpDeskBanner = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[350px] lg:h-[450px] md:mt-10 mt-16 overflow-hidden bg-[#0a0a0f]">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950"></div>
            
            {/* Animated Mesh Gradients / Glowing Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>

            {/* Subtle Grid Pattern with Fade-out */}
            <div 
                className="absolute inset-0 opacity-[0.15]" 
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                }}
            ></div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
                
                {/* Breadcrumb - Sleek Design */}
                <nav className="flex items-center space-x-2 text-sm mb-8">
                    <a href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </a>
                    <span className="text-slate-600">/</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 font-semibold tracking-wide uppercase text-xs">
                        Help Desk
                    </span>
                </nav>

                {/* Title & Description Area */}
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-2">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-bold">Support System</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">help you?</span>
                    </h1>
                    
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                        Search our knowledge base or manage your existing support tickets with ease.
                    </p>
                </div>

                {/* Floating Decorative Element (Right side) */}
                <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 border border-white/5 rounded-3xl rotate-12 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[2px] flex items-center justify-center">
                        <div className="w-48 h-48 border border-white/10 rounded-2xl -rotate-6 bg-white/5 shadow-2xl flex items-center justify-center">
                             <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                             </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    );
};

export default HelpDeskBanner;
import React from 'react';

const TermsBanner = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[350px] lg:h-[450px] md:mt-10 mt-16 overflow-hidden bg-[#0a0a0f]">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-indigo-950"></div>

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-500/10 rounded-full blur-[110px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[55%] bg-indigo-500/10 rounded-full blur-[100px]"></div>

            {/* Micro Grid Pattern with Radial Mask */}
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
                }}
            ></div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">

                {/* Breadcrumb - Clean Style */}
                <nav className="flex items-center space-x-2 text-sm max-sm:mb-4 animate-fade-in">
                    <a href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                        Home
                    </a>
                    <span className="text-slate-700">/</span>
                    <span className="text-blue-400 font-medium uppercase tracking-widest text-[11px]">
                        Legal Policy
                    </span>
                </nav>

                <div className="grid lg:grid-cols-2 items-center gap-10">
                    {/* Text Area */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                            <svg className="w-3 h-3 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[10px] text-blue-300 uppercase tracking-[0.2em] font-bold">Effective Dec 2025</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                            Usage Guidelines & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 leading-normal">Legal Policy.</span>
                        </h1>

                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                            Transparency and fairness are at our core. Explore the rules, responsibilities, and legal framework that govern our services.
                        </p>
                    </div>

                    {/* Decorative Visual Element (Right side) - Document/Shield focus */}
                    <div className="hidden lg:flex justify-end pr-10">
                        <div className="relative">
                            {/* Glass Card */}
                            <div className="w-64 h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl rotate-6 flex flex-col p-6 space-y-4">
                                <div className="w-12 h-1.5 bg-blue-500/40 rounded-full"></div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full"></div>
                                <div className="w-3/4 h-1.5 bg-white/10 rounded-full"></div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full"></div>
                                <div className="w-1/2 h-1.5 bg-white/10 rounded-full"></div>

                                <div className="flex-grow flex items-center justify-center pt-4">
                                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Blur behind card */}
                            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl -z-10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>
    );
};

export default TermsBanner;
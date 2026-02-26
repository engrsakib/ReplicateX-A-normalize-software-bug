import React, { useState, useEffect } from 'react';

const CountdownModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // ডাইনামিক টাইম স্টেট
    const [elapsedTime, setElapsedTime] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        // ১. সেশন চেক (একবার দেখানোর জন্য)
        const hasShownModal = sessionStorage.getItem('hasShownHadiModal');

        if (!hasShownModal) {
            const openTimer = setTimeout(() => {
                setIsVisible(true);
                setTimeout(() => setShowContent(true), 50);
                sessionStorage.setItem('hasShownHadiModal', 'true');
            }, 2000); // ২ সেকেন্ড ডিলে
        }

        // ২. ডাইনামিক কাউন্ট-আপ লজিক (১২ ডিসেম্বর ২০২৫ থেকে)
        const startDate = new Date('2025-12-12T00:00:00');

        const calculateTime = () => {
            const now = new Date();
            const difference = now - startDate;

            if (difference > 0) {
                let seconds = Math.floor((difference / 1000) % 60);
                let minutes = Math.floor((difference / 1000 / 60) % 60);
                let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                let days = Math.floor(difference / (1000 * 60 * 60 * 24));

                setElapsedTime({ days, hours, minutes, seconds });
            }
        };

        // প্রতি ১ সেকেন্ড পরপর টাইম আপডেট হবে (Dynamic)
        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // সংখ্যাগুলোকে বাংলা অক্ষরে দেখানোর ফাংশন
    const toBengaliNumber = (num) => {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().split('').map(digit => bengaliDigits[digit] || digit).join('');
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>

            {/* চ্যাপ্টা ডিজাইন: max-w-4xl */}
            <div className={`relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden text-center border-t-[8px] border-red-600 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${showContent ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>

                <button
                    onClick={() => {
                        setShowContent(false);
                        setTimeout(() => setIsVisible(false), 800);
                    }}
                    className="absolute top-3 right-5 text-3xl font-light text-gray-400 hover:text-red-600 transition-all"
                >
                    &times;
                </button>

                <div className="py-6 px-8 md:px-16">
                    {/* ছোট করা হেডলাইন */}
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <div className="bg-red-600 text-white px-4 py-0.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase">
                            <span>⚖️</span> বিচারের দাবি
                        </div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">শহীদ ওসমান হাদি হত্যার বিচারহীনতা</h1>
                        <p className="text-gray-400 text-sm font-medium">১২ ডিসেম্বর ২০২৫ থেকে আজ পর্যন্ত</p>
                    </div>

                    {/* ডাইনামিক টাইম গ্রিড */}
                    <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
                        {[
                            { label: 'দিন', value: elapsedTime.days },
                            { label: 'ঘণ্টা', value: elapsedTime.hours },
                            { label: 'মিনিট', value: elapsedTime.minutes },
                            { label: 'সেকেন্ড', value: elapsedTime.seconds, color: 'text-red-600' }
                        ].map((item, index) => (
                            <div key={index} className="bg-slate-50 border border-gray-100 rounded-xl py-4 shadow-sm">
                                <span className={`text-3xl md:text-5xl font-black tabular-nums ${item.color || 'text-slate-800'}`}>
                                    {toBengaliNumber(String(item.value).padStart(2, '0'))}
                                </span>
                                <p className="text-gray-400 mt-1 text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-red-600 text-white py-3 px-4 rounded-lg text-sm md:text-lg font-bold shadow-md mb-6 ">
                        খুনিদের বিচার না হওয়া পর্যন্ত এই সংগ্রাম চলবে
                    </div>

                    <div className="flex flex-col items-center gap-0.5 opacity-70">
                        <a
                            href="https://hadiarchive.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-red-600 font-semibold text-xs md:text-sm transition-colors duration-300"
                        >
                            hadiarchive.com
                        </a>
                        <p className="text-[8px] md:text-[10px] text-gray-300 font-bold uppercase tracking-[2px]">
                            Bridge Byte Tech × DangerousForce
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownModal;
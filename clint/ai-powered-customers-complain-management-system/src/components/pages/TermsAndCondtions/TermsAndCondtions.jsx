import React, { useState, useEffect } from 'react';
import TermsBanner from './TermsBanner';

// --- 1. Skeleton Loader Component (Loading State) ---
// Dark mode friendly skeleton
const LoadingSkeleton = () => (
    <div className="animate-pulse p-8 bg-transparent border-t border-b border-gray-700">
        <div className="h-10 bg-gray-700 rounded w-1/3 mb-6 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-10 mx-auto"></div>

        {/* Sections */}
        {[...Array(4)].map((_, index) => (
            <div key={index} className="mb-8">
                <div className="h-6 bg-blue-900 rounded w-1/5 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-11/12 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-4/5"></div>
            </div>
        ))}
    </div>
);


// --- 2. Terms and Conditions Content Component (Final Design with Hover) ---
const TermsAndConditionsContent = () => {

    // Proti-ti section-e ei common styling gulo use kora hobe
    const baseSectionStyle = "mb-10 p-5 rounded-xl border border-gray-800 bg-gray-900/40 transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:shadow-2xl hover:border-cyan-400";

    // Header styling
    const headerStyle = "text-xl md:text-2xl font-semibold border-l-4 border-emerald-400 pl-4 mb-4 text-white";


    return (
        <div className="p-6 md:p-12 lg:p-16 text-base leading-relaxed text-gray-300 bg-transparent">

            {/* Header Section (with Gradient Title) */}
            <header className="border-b-4 border-cyan-400 pb-6 mb-12">

                {/* Applied the requested Gradient Title styling */}
                <h1 className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight mb-3 text-center">
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Terms and
                    </span>{' '}
                    Conditions
                </h1>

                <p className="text-lg text-gray-400 mt-2 text-center">
                    ReplicateX | From Report to Resolution — Faster Than Ever
                </p>

                {/* Last Updated Date */}
                <div className="text-right text-sm text-gray-400 font-medium pt-4 border-t border-gray-700 mt-4">
                    Last Updated: <span className="text-cyan-400 font-semibold">December 15, 2025</span>
                </div>
            </header>

            {/* 1. Introduction */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>1. Introduction</h2>
                <p className="text-gray-300 mb-4 pl-4">
                    Welcome to ReplicateX. By accessing or using our customer support application, website, or services (collectively, the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). These Terms constitute a legally binding agreement between you and ReplicateX, located in Magura, Khulna, Bangladesh.
                </p>
                <blockquote className="p-4 ml-4 border-l-4 border-yellow-400 bg-yellow-900/40 text-yellow-300 italic rounded-md">
                    If you disagree with any part of these terms, you may not access the Service.
                </blockquote>
            </section>

            {/* 2. Definitions */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>2. Definitions</h2>
                <ul className="space-y-3 text-gray-300 pl-4">
                    <li>
                        <strong className="font-semibold text-white">"Company," "We," "Us," or "Our"</strong> refers to ReplicateX, operating under the laws of Bangladesh.
                    </li>
                    <li>
                        <strong className="font-semibold text-white">"User," "You," or "Client"</strong> refers to the individual or business entity registering for or using the Service.
                    </li>
                    <li>
                        <strong className="font-semibold text-white">"Customer Data"</strong> refers to any data, information, or material submitted by you to the Service during the course of using the Service.
                    </li>
                </ul>
            </section>

            {/* 3. Account Registration & Security */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>3. Account Registration & Security</h2>
                <p className="text-gray-300 mb-3 pl-4">
                    To use ReplicateX, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-8 text-gray-300">
                    <li>Provide accurate and complete information.</li>
                    <li>Maintain the security of your password.</li>
                    <li>Notify us immediately of any unauthorized use of your account.</li>
                    <li>Accept responsibility for all activities that occur under your account.</li>
                </ul>
            </section>

            {/* 4. License and Acceptable Use */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>4. License and Acceptable Use</h2>
                <p className="text-gray-300 mb-3 pl-4">
                    We grant you a revocable, non-exclusive, non-transferable, limited license to use ReplicateX strictly in accordance with these Terms.
                </p>
                <p className="font-bold text-red-400 mt-4 mb-2 pl-4">You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-8 text-red-400 font-medium">
                    <li>Use the Service for any unlawful purpose or to violate any laws in Bangladesh or your jurisdiction.</li>
                    <li>Attempt to reverse engineer, decompile, or hack the Service.</li>
                    <li>Transmit viruses, malware, or any other malicious code.</li>
                    <li>Resell or sublicense the Service without our prior written consent.</li>
                </ul>
            </section>

            {/* 5. Subscription, Billing, and Refunds */}
            {/* Special Highlight section */}
            <section className="mb-10 border-l-4 border-cyan-400 pl-4 py-4 bg-gray-800/60 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
                <h2 className={headerStyle.replace('border-emerald-400', 'border-cyan-400')}>5. Subscription, Billing, and Refunds</h2>
                <ul className="space-y-3 text-gray-300 pl-4">
                    <li><strong className="font-semibold text-white">Fees:</strong> Services are billed on a subscription basis (Monthly/Yearly) as per the pricing page.</li>
                    <li><strong className="font-semibold text-white">Payments:</strong> All payments must be made in the currency specified (e.g., BDT or USD).</li>
                    <li><strong className="font-semibold text-white">Cancellation:</strong> You may cancel your subscription at any time. The cancellation will take effect at the end of the current billing cycle.</li>
                    <li><strong className="font-semibold text-white">Refund Policy:</strong> All fees are non-refundable unless expressly stated otherwise or required by the consumer protection laws of Bangladesh.</li>
                </ul>
            </section>

            {/* 6. Data Privacy and Ownership */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>6. Data Privacy and Ownership</h2>
                <ul className="space-y-3 text-gray-300 pl-4">
                    <li><strong className="font-semibold text-white">Ownership:</strong> You retain all rights to your Customer Data. We do not own your data.</li>
                    <li><strong className="font-semibold text-white">Data Processing:</strong> By using ReplicateX, you grant us permission to process your data solely to provide the support services, including the use of AI automation features.</li>
                    <li><strong className="font-semibold text-white">Confidentiality:</strong> We will take reasonable industry-standard measures to protect your data from unauthorized access.</li>
                </ul>
            </section>

            {/* 7. AI Disclaimer */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>7. AI Disclaimer</h2>
                <div className="p-4 border border-blue-400 bg-blue-900/40 rounded-lg shadow-inner text-white ml-4">
                    <p>ReplicateX utilizes Artificial Intelligence to assist in "Report to Resolution." While we strive for accuracy, AI-generated responses may occasionally be inaccurate. You acknowledge that ReplicateX is not liable for errors in AI-generated suggestions and that <strong className="text-blue-400">human review is recommended</strong> for critical support issues.</p>
                </div>
            </section>

            {/* 8. Limitation of Liability */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>8. Limitation of Liability</h2>
                <p className="text-gray-300 mb-2 pl-4">
                    To the maximum extent permitted by applicable law, in no event shall ReplicateX, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
                </p>
                <p className="font-bold text-red-400 mt-3 pl-4">
                    Our total liability is limited to the amount paid by you to ReplicateX in the last 6 months.
                </p>
            </section>

            {/* 9. Governing Law and Jurisdiction */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>9. Governing Law and Jurisdiction</h2>
                <p className="text-gray-300 pl-4">
                    These Terms shall be governed and construed in accordance with the laws of The People's Republic of Bangladesh.
                </p>
                <p className="text-gray-300 mt-2 pl-4">
                    Any dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in <strong className="text-emerald-400">Magura, Khulna, Bangladesh.</strong>
                </p>
            </section>

            {/* 10. Modifications to Service */}
            <section className={baseSectionStyle}>
                <h2 className={headerStyle}>10. Modifications to Service</h2>
                <p className="text-gray-300 pl-4">
                    We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
                </p>
            </section>

            {/* 11. Contact Us */}
            <footer className="pt-8 border-t border-gray-700 mt-10">
                <h2 className={headerStyle}>11. Contact Us</h2>
                <p className="text-gray-300 mb-4 pl-4">
                    If you have any questions about these Terms, please contact us at:
                </p>
                {/* Contact box with slight contrast and hover effect */}
                <div className="p-5 bg-gray-800 rounded-xl space-y-2 ml-4 border border-gray-700 transition duration-300 hover:border-emerald-400 hover:bg-gray-800/90">
                    <p><strong className="font-semibold text-white">Company Name:</strong> ReplicateX</p>
                    <p><strong className="font-semibold text-white">Address:</strong> Magura, Khulna, Bangladesh</p>
                </div>
            </footer>

        </div>
    );
};

// --- 3. Main Component with Loading Logic ---
const TermsAndCondtions = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate network delay for loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        // bg-transparent and max-w-6xl
        <div className="w-full bg-transparent">
            <TermsBanner />

            {/* Content container with max-w-6xl */}
            <div className="max-w-[1400px] mx-auto py-12 md:py-20">
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <TermsAndConditionsContent />
                )}
            </div>
        </div>
    );
};

export default TermsAndCondtions;
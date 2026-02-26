import React from 'react';
import { motion } from 'framer-motion';
import { 
    HiOutlineLightningBolt, 
    HiOutlineUsers, 
    HiOutlineDocumentReport, 
    HiOutlineCursorClick,
    HiOutlineExternalLink
} from 'react-icons/hi';

const Analytics = () => {
    
    const stats = [
        { label: "Total Traffic", value: "924,180", change: "+12.5%", color: "from-blue-500 to-cyan-400" },
        { label: "Active Session", value: "2,840", change: "+5.1%", color: "from-indigo-500 to-purple-400" },
        { label: "New Records", value: "14,200", change: "-2.4%", color: "from-emerald-500 to-teal-400" },
        { label: "Conversion", value: "4.2%", change: "+0.8%", color: "from-rose-500 to-orange-400" },
    ];

    const dataPoints = [45, 72, 38, 91, 56, 82, 49, 95, 63, 78, 52, 88];

    return (
        <div className="min-h-screen p-6 text-slate-300">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics Overview</h1>
                        <p className="text-slate-500 text-sm mt-1">Live performance monitoring and system logs.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-slate-800/50 border border-slate-700 rounded-sm text-xs font-medium hover:bg-slate-800 transition-all">Download Report</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/20 border border-slate-800/60 p-5 rounded-sm relative group overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.color} opacity-50`}></div>
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-medium text-slate-500">{item.label}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">{item.change}</span>
                            </div>
                            <div className="text-2xl font-bold text-white leading-none">{item.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-slate-900/10 border border-slate-800/50 rounded-sm p-6 relative">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Activity Flow
                            </h2>
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Current Period
                                </span>
                            </div>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-1 relative z-10">
                            {dataPoints.map((h, i) => (
                                <div key={i} className="flex-1 group relative flex flex-col items-center">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, ease: "circOut" }}
                                        className="w-full max-w-[14px] bg-gradient-to-t from-blue-600/5 to-blue-500/60 rounded-t-sm relative transition-all group-hover:to-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    >
                                        <div className="absolute -top-1 w-full h-[2px] bg-blue-400 shadow-[0_0_8px_#60a5fa]"></div>
                                    </motion.div>
                                    <div className="mt-4 text-[9px] font-medium text-slate-600 group-hover:text-slate-400 transition-colors">T{i+1}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="absolute inset-x-6 top-[130px] bottom-14 flex flex-col justify-between pointer-events-none">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="w-full h-px bg-slate-800/40"></div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900/10 border border-slate-800/50 rounded-sm p-6">
                        <h2 className="text-sm font-semibold text-white mb-8 flex items-center gap-2">
                             <div className="w-1 h-4 bg-emerald-500 rounded-full"></div> Reach Analysis
                        </h2>
                        <div className="space-y-6">
                            {[
                                { name: "Direct Traffic", val: 68, color: "bg-blue-500" },
                                { name: "Social Referral", val: 42, color: "bg-indigo-500" },
                                { name: "Organic Search", val: 85, color: "bg-emerald-500" },
                                { name: "Email Campaign", val: 30, color: "bg-rose-500" }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-center mb-2.5">
                                        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">{item.name}</span>
                                        <span className="text-[10px] font-mono text-slate-500">{item.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden p-[1px]">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.val}%` }}
                                            className={`h-full ${item.color} rounded-full relative shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                                        >
                                            <div className="absolute top-0 right-0 w-4 h-full bg-white/20 blur-[2px]"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-10 p-4 border border-slate-800 bg-slate-800/20 rounded-sm">
                            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                <HiOutlineLightningBolt />
                                <span className="text-[11px] font-bold tracking-tight">Optimization Tip</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Organic search is performing 20% better than last month. Continue focusing on SEO.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/10 border border-slate-800/50 rounded-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800/50 flex justify-between items-center">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-tight">Recent System Pulse</h2>
                        <HiOutlineExternalLink className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    <div className="divide-y divide-slate-800/30 font-mono">
                        {[
                            { time: "09:42:10", action: "User session initialized", node: "Node-01", status: "Active" },
                            { time: "09:40:05", action: "Database backup completed", node: "Main", status: "Success" },
                            { time: "09:38:12", action: "Cache cleared by admin", node: "Worker-3", status: "Alert" }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center px-6 py-3 text-[10px] hover:bg-white/[0.02] transition-colors group">
                                <span className="w-24 text-slate-600">{log.time}</span>
                                <span className="flex-1 text-slate-400 group-hover:text-slate-200">{log.action}</span>
                                <span className="w-24 text-slate-600">{log.node}</span>
                                <span className={`w-16 text-right ${log.status === 'Alert' ? 'text-rose-500' : 'text-emerald-500'}`}>{log.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
import React from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MessageSquare, CheckCircle, Clock, BrainCircuit, MoreHorizontal, Download, Share2, Zap } from 'lucide-react';

// --- Complaint Data (Solved per Month) ---
const resolutionData = [
    { name: 'Jan', solved: 400 }, { name: 'Feb', solved: 300 }, { name: 'Mar', solved: 600 },
    { name: 'Apr', solved: 800 }, { name: 'May', solved: 500 }, { name: 'Jun', solved: 1100, highlight: true },
    { name: 'Jul', solved: 700 }, { name: 'Aug', solved: 600 }, { name: 'Sept', solved: 800 },
    { name: 'Oct', solved: 900 }, { name: 'Nov', solved: 700 }, { name: 'Dec', solved: 600 },
];



// --- Status Distribution ---
const statusData = [
    { name: 'AI Solved', value: 450, color: '#6366f1' },
    { name: 'Manual Review', value: 180, color: '#a855f7' },
    { name: 'Pending', value: 120, color: '#ec4899' },
    { name: 'Rejected', value: 50, color: '#eab308' },
];

const AdminHome = () => {
    return (
        <div className="min-h-screen bg-transparent text-white p-6 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Complaint Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1">Real-time overview of system performance</p>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="bg-[#1a1a2e]/60 border border-gray-800 rounded-lg px-4 py-2 flex items-center gap-2 text-sm backdrop-blur-md">
                        <span>📅 Last 12 Months</span>
                    </div>
                    <button className="p-2 bg-[#1a1a2e]/60 border border-gray-800 rounded-lg hover:bg-gray-800 transition"><Share2 size={18} /></button>
                    <button className="p-2 bg-[#1a1a2e]/60 border border-gray-800 rounded-lg hover:bg-gray-800 transition"><Download size={18} /></button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition shadow-lg shadow-indigo-500/20">
                        <Zap size={16} fill="white" /> AI Assistant
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Complaints" value="8,492" change="+12%" icon={<MessageSquare size={20} className="text-indigo-400" />} color="text-green-500" />
                <StatCard title="Resolved via AI" value="6,120" change="+28%" icon={<CheckCircle size={20} className="text-green-400" />} color="text-green-500" />
                <StatCard title="Avg. Response Time" value="1.4m" change="-40%" icon={<Clock size={20} className="text-purple-400" />} color="text-green-400" />
                <StatCard title="AI Accuracy" value="96.8%" subtext="Based on user feedback" icon={<BrainCircuit size={20} className="text-pink-400" />} color="text-indigo-400" />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Resolution Trends (Bar Chart) - Occupies 2 columns */}
                <div className="bg-[#131322]/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800 lg:col-span-2">
                    <div className="flex justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold">Monthly Resolution Growth</h3>
                            <p className="text-xs text-gray-500">Solved complaints using AI automation</p>
                        </div>
                        <MoreHorizontal className="text-gray-500 cursor-pointer" />
                    </div>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={resolutionData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                <Tooltip cursor={{ fill: '#1a1a2e' }} content={<CustomTooltip />} />
                                <Bar dataKey="solved" radius={[6, 6, 0, 0]}>
                                    {resolutionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.highlight ? '#6366f1' : '#2d2d44'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Complaint Status (Donut Chart) */}
                <div className="bg-[#131322]/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800">
                    <div className="flex justify-between mb-6">
                        <h3 className="text-lg font-semibold">Status Breakdown</h3>
                        <MoreHorizontal className="text-gray-500 cursor-pointer" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full h-[220px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statusData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value">
                                        {statusData.map((entry, index) => <Cell key={index} fill={entry.color} stroke="none" />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">8.4K</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="w-full mt-6 space-y-3">
                            {statusData.map((item) => (
                                <div key={item.name} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-400">{item.name}</span>
                                    </div>
                                    <span className="font-semibold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

// --- Helper Components ---

const StatCard = ({ title, value, change, icon, subtext, color }) => (
    <div className="bg-[#131322]/40 backdrop-blur-md p-5 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors group">
        <div className="flex justify-between items-start mb-4">
            <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
            <div className="p-2 bg-[#1a1a2e] rounded-lg group-hover:bg-indigo-500/10 transition-colors">{icon}</div>
        </div>
        <div className="text-3xl font-bold mb-1 tracking-tight">{value}</div>
        <div className="flex items-center gap-2">
            {change && <span className={`text-xs ${color} font-medium`}>↗ {change}</span>}
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{subtext || 'vs last month'}</span>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a2e] border border-gray-700 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{payload[0].payload.name} 2024</p>
                <p className="text-lg font-bold text-white flex items-center gap-2">
                    {payload[0].value} <span className="text-green-400 text-xs">↗ +25%</span>
                </p>
                <p className="text-[10px] text-indigo-400">AI Resolved Success</p>
            </div>
        );
    }
    return null;
};

const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a2e]/90 border border-gray-700 p-4 rounded-xl shadow-2xl min-w-[140px] backdrop-blur-xl">
                <p className="text-xs text-gray-400 mb-2 border-b border-gray-800 pb-1 font-bold">Monthly Volume</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 py-1">
                        <span className="text-xs flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}
                        </span>
                        <span className="text-sm font-bold">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default AdminHome;
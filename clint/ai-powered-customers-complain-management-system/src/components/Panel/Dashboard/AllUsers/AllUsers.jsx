import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineMail, HiOutlinePhone, HiOutlineTrash, HiOutlinePencilAlt, HiOutlineSearch, HiOutlineArrowSmUp, HiOutlineTrendingUp } from 'react-icons/hi';
import { IoShieldCheckmarkOutline, IoPulseOutline } from 'react-icons/io5';

const AllUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const users = [
        { id: 1, name: "Arif Ahmed", email: "arif@example.com", phone: "+8801700000000", role: "ADMIN", status: "Active", image: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Sabbir Hossain", email: "sabbir@example.com", phone: "+8801800000000", role: "USER", status: "Active", image: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Rahat Khan", email: "rahat@example.com", phone: "+8801900000000", role: "USER", status: "Pending", image: "https://i.pravatar.cc/150?u=3" },
    ];

    return (
        <div className=" p-4 md:p-8 text-white">
            <div className="max-w-full mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Platform Analytics
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Real-time user insights and system health</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search system..." 
                                className="bg-gray-900/40 border border-gray-800 rounded-sm py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Users", count: "1,240", icon: HiOutlineUsers, color: "blue", growth: "+12%" },
                        { label: "Active Nodes", count: "48", icon: IoPulseOutline, color: "cyan", growth: "Stable" },
                        { label: "New Joiners", count: "12", icon: HiOutlinePencilAlt, color: "purple", growth: "+5%" },
                        { label: "Retention", count: "94%", icon: HiOutlineTrendingUp, color: "green", growth: "+2%" }
                    ].map((stats, i) => (
                        <div key={i} className="bg-gray-900/10 border border-gray-800/60 p-5 rounded-sm backdrop-blur-sm hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-sm bg-${stats.color}-500/10 text-${stats.color}-400`}>
                                    <stats.icon size={20} />
                                </div>
                                <span className="text-[10px] text-green-400 font-bold flex items-center bg-green-500/5 px-2 py-1 rounded-sm">
                                    <HiOutlineArrowSmUp /> {stats.growth}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-sans ">{stats.count}</h3>
                                <p className="text-gray-500 text-lg mt-1 ">{stats.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-gray-900/20 border border-gray-800 rounded-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-semibold   text-gray-400">User Activity Load</h2>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
                            </div>
                        </div>
                        <div className="h-48 flex items-end justify-between gap-2 px-2">
                            {[40, 70, 45, 90, 65, 80, 30, 95, 50, 75, 60, 85].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="w-full bg-gradient-to-t from-blue-600/20 to-blue-400/60 rounded-t-sm relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] text-gray-600 font-mono">
                            <span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span>
                        </div>
                    </div>

                    <div className="bg-gray-900/20 border border-gray-800 rounded-sm p-6">
                        <h2 className="text-sm font-semibold   text-gray-400 mb-6">Device Distribution</h2>
                        <div className="space-y-5">
                            {[
                                { label: "Desktop Users", val: 65, color: "bg-blue-500" },
                                { label: "Mobile Users", val: 28, color: "bg-cyan-500" },
                                { label: "Tablet/Others", val: 7, color: "bg-indigo-500" }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">{item.label}</span>
                                        <span className="font-mono">{item.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.val}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-transparent border border-gray-800 rounded-sm overflow-hidden backdrop-blur-md">
                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                        <h2 className="text-sm font-semibold   text-gray-400">Database Records</h2>
                        <button className="text-xs text-blue-400 hover:underline">Export CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-900/40 border-b border-gray-800">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 er">Identity</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 er">Privilege</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 er">Network</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase  text-gray-500 er">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 er text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {users.map((user) => (
                                    <motion.tr 
                                        key={user.id}
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.01)" }}
                                        className="transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.image} alt="" className="w-8 h-8 rounded-sm border border-gray-800 object-cover" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-300">{user.name}</p>
                                                    <p className="text-[10px] text-gray-600 font-mono italic">UID-{user.id}XF90</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm ${user.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-800/50 text-gray-500'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-[11px] text-gray-500 font-mono">
                                                <div className="flex items-center gap-2 italic">
                                                    <HiOutlineMail className="text-blue-500/50" /> {user.email}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <HiOutlinePhone className="text-green-500/50" /> {user.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-gray-600'}`}></div>
                                                <span className={`text-xs ${user.status === 'Active' ? 'text-green-500' : 'text-gray-500'}`}>{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:text-blue-400 transition-colors text-gray-600"><HiOutlinePencilAlt size={16} /></button>
                                                <button className="p-2 hover:text-red-400 transition-colors text-gray-600"><HiOutlineTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
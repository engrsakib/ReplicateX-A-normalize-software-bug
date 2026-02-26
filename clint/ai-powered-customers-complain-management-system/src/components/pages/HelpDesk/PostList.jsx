

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MessageSquare, Search, ChevronLeft, ChevronRight, Filter, AlertCircle, Bookmark } from 'lucide-react';
import PostDetailsModal from './PostDetailsModal';

const API_URL = import.meta.env.VITE_API_URL;

const PostSkeleton = () => (
    <div className="bg-gray-900 border border-white/5 rounded-md p-6 animate-pulse mb-6">
        <div className="flex justify-between mb-4">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-24 bg-white/10 rounded" />
                </div>
            </div>
            <div className="h-6 w-16 bg-white/10 rounded-full" />
        </div>
        <div className="h-5 w-full bg-white/10 rounded mb-3" />
        <div className="h-4 w-3/4 bg-white/5 rounded mb-4" />
        <div className="flex justify-between mt-4">
            <div className="h-4 w-20 bg-white/5 rounded" />
            <div className="h-4 w-24 bg-white/5 rounded" />
        </div>
    </div>
);

const PostList = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [postType, setPostType] = useState('');
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ totalPage: 1 });

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [searchTerm, postType, page]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/help-desk`, {
                params: { searchTerm, postType, page, limit: 6 },
                headers: { 'Authorization': token }
            });
            const { data, meta } = response.data.data;
            setPosts(data || []);
            setMeta(meta || { totalPage: 1 });
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const displayPosts = filter === 'my'
        ? posts.filter(p => p.creator?.name === currentUser?.name)
        : posts;

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    const handleCardClick = (id) => {
        setSelectedPostId(id);
        setIsModalOpen(true);
    };

    return (
        <div className="mt-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                <div className="relative group col-span-1 md:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search topics..."
                        className="w-full bg-gray-900 border border-white/5 rounded-md py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                        className="w-full bg-gray-900  border border-white/5 rounded-md py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-purple-500/50"
                        onChange={(e) => setPostType(e.target.value)}
                    >
                        <option value="">All Type</option>
                        <option value="Core.Course">Core Course</option>
                        <option value="Skill.Development">Skill Development</option>
                        <option value="Research.Project">Research Project</option>
                    </select>
                </div>

                <div className="flex bg-[#1c1c28] p-1 rounded-md border border-white/5">
                    <button onClick={() => setFilter('all')} className={`flex-1 py-3 rounded-md text-xs font-bold transition-all ${filter === 'all' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500'}`}>All Post</button>
                    <button onClick={() => setFilter('my')} className={`flex-1 py-3 rounded-md text-xs font-bold transition-all ${filter === 'my' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500'}`}>My Post</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <PostSkeleton key={i} />)
                ) : (
                    <AnimatePresence mode='popLayout'>
                        {displayPosts.map((post) => (
                            <motion.div
                                key={post._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => handleCardClick(post._id)}
                                className="bg-gray-900 border border-white/5 rounded-md p-6 hover:shadow-2xl hover:shadow-purple-500/5 transition-all relative overflow-hidden group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <img
                                                src={post.creator?.image || "https://i.ibb.co/5h9M0pC/avatar.png"}
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/20"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-base md:text-lg group-hover:text-purple-400 transition-colors leading-tight">
                                                {post.creator?.name}
                                            </h3>
                                            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                                <Clock size={12} /> {formatDateTime(post.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="bg-purple-500/10 text-purple-400 text-[10px] px-3 py-1 rounded-full border border-purple-500/20 font-bold uppercase tracking-wider">
                                            {post.status}
                                        </span>
                                        {post.is_duplicate && (
                                            <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-md font-black animate-pulse">
                                                <AlertCircle size={10} /> DUPLICATE
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-slate-100 font-bold text-md leading-snug line-clamp-2 group-hover:text-white transition-colors">
                                        {post.title}
                                    </h4>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                        {post.shortDescription}
                                    </p>




                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <div className="flex items-center gap-2 bg-slate-800/30 px-3 py-1.5 rounded-xl border border-white/5">
                                        <Bookmark size={14} className="text-purple-500" />
                                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter">
                                            {post.postType}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-slate-500 hover:text-purple-400 transition-colors cursor-pointer">
                                        <MessageSquare size={16} />
                                        <span className="text-xs font-bold">{post.commentsCount || 0} Comments</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            <div className="flex items-center justify-start gap-3 mt-12 pb-10">
                <button
                    disabled={page === 1}
                    onClick={() => { setPage(prev => prev - 1); window.scrollTo(0, 0); }}
                    className="p-3 rounded-lg bg-[#1c1c28] border border-white/5 text-slate-400 disabled:opacity-20 hover:bg-purple-600 hover:text-white transition-all shadow-xl"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="bg-[#1c1c28] border border-white/5 px-6 py-2.5 rounded-lg shadow-xl">
                    <span className="text-slate-500 text-xs font-bold uppercase mr-2">Page</span>
                    <span className="text-white font-black text-lg">{page}</span>
                    <span className="text-slate-600 mx-2">/</span>
                    <span className="text-slate-400 font-bold">{meta.totalPage}</span>
                </div>
                <button
                    disabled={page >= meta.totalPage}
                    onClick={() => { setPage(prev => prev + 1); window.scrollTo(0, 0); }}
                    className="p-3 rounded-lg bg-[#1c1c28] border border-white/5 text-slate-400 disabled:opacity-20 hover:bg-purple-600 hover:text-white transition-all shadow-xl"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <PostDetailsModal
            className=""
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                postId={selectedPostId}
                currentUser={currentUser}
            />
        </div>
    );
};

export default PostList;
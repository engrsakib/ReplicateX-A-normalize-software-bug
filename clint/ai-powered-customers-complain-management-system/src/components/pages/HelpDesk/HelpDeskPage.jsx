import React, { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import { ToastContainer } from 'react-toastify';
import { ImageIcon } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import PostList from './PostList';

const HelpDeskPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className="bg-transparent max-w-[1400px] mx-auto p-4 md:p-10">
            <ToastContainer position="top-right" theme="dark" />

            <div className="max-w-4xl">
                <div className="bg-gray-900 border border-white/5 rounded-md p-4 shadow-xl">
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.image || "https://i.ibb.co/5h9M0pC/avatar.png"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/20"
                        />
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="flex-1 bg-[#2a243d] hover:bg-[#342d4a] transition-colors rounded-full px-6 py-3 cursor-pointer"
                        >
                            <span className="text-slate-400 text-sm md:text-base">
                                Whats on your mind, {user?.name || 'Guest'} ?
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
                            <ImageIcon size={18} className="text-pink-500" />
                            <span className="text-sm font-medium">Photo/Video</span>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-br from-purple-600 to-blue-700 hover:from-purple-500 hover:to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
                        >
                            Create Post
                        </button>
                    </div>
                </div>


            </div>


            <div>
                {/* এখানে currentUser পাস করা হয়েছে */}
                <PostList currentUser={user} />
            </div>


            <CreatePost
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
            />
        </div>
    );
};

export default HelpDeskPage;
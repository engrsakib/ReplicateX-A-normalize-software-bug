import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Image as ImageIcon, Search, ChevronDown, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const AvailableKeywords = [
    "Physics", "Chemistry", "Mathematics", "Higher.Math", "Biology", "Zoology", "Botany",
    "General.Science", "Computer.Science", "Electrical.Engineering", "Civil.Engineering",
    "Bangla", "English", "History", "Economics", "Civics", "Geography", "Psychology",
    "Sociology", "Political.Science", "Islamic.Studies", "Law", "Accounting", "Finance",
    "Marketing", "Management", "Statistics", "Business.Math", "Web.Development",
    "App.Development", "Software.Engineering", "Game.Development", "UI.UX.Design",
    "DevOps", "Cyber.Security", "Cloud.Computing", "Blockchain", "Data.Science",
    "Machine.Learning", "Artificial.Intelligence", "JavaScript", "Python", "Java",
    "C.Programming", "C.Plus.Plus", "TypeScript", "PHP", "Database", "Git.GitHub",
    "Freelancing", "Digital.Marketing", "Graphics.Design", "Video.Editing",
    "IELTS.Preparation", "Job.Preparation", "Research"
];

const PostCategories = [
    { label: "Core Course", value: "Core.Course" },
    { label: "Elective Course", value: "Elective.Course" },
    { label: "Lab Session", value: "Lab.Session" },
    { label: "Research Project", value: "Research.Project" },
    { label: "Corporate Training", value: "Corporate.Training" },
    { label: "Compliance Module", value: "Compliance.Module" },
    { label: "Onboarding Session", value: "Onboarding.Session" },
    { label: "Skill Development", value: "Skill.Development" },
    { label: "Workshop/Seminar", value: "Workshop.Seminar" },
    { label: "Certification Program", value: "Certification.Program" }
];

const CreatePost = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [keywords, setKeywords] = useState([]);
    const [currentKeyword, setCurrentKeyword] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [keywordError, setKeywordError] = useState('');

    const suggestionRef = useRef(null);
    const fileInputRef = useRef(null);
    const descriptionValue = watch("description");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        if (keywords.length > 0 && keywords.length < 4) {
            setKeywordError('You must select at least 4 keywords.');
        } else if (keywords.length > 9) {
            setKeywordError('You can select maximum 9 keywords.');
        } else {
            setKeywordError('');
        }
    }, [keywords]);

    const uploadToImgBB = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
            if (res.data.success) setAttachments(prev => [...prev, res.data.data.url]);
        } catch (err) { toast.error("Image upload failed!"); } finally { setIsUploading(false); }
    };

    const onSubmitForm = async (data) => {
        if (keywords.length < 4 || keywords.length > 9) {
            setKeywordError('Selection must be between 4 and 9 keywords.');
            return;
        }
        setIsSubmitting(true);
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const payload = {
                title: data.title.trim(),
                postType: data.postType,
                description: data.description.trim(),
                keywords: keywords,
                createdBy: userData?._id,
                attachments: attachments
            };
            await axios.post(`${API_URL}/help-desk`, payload, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            toast.success("Post Published Successfully! 🚀");
            reset(); setKeywords([]); setAttachments([]); onClose();
        } catch (error) { toast.error("Server Error!"); } finally { setIsSubmitting(false); }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-gray-900 w-full max-w-2xl rounded-sm border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Static Header */}
                        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-gray-900 rounded-t-2xl">
                            <h2 className="text-white text-xl font-semibold">Create Post</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-all"><X size={24} /></button>
                        </div>

                        {/* Scrollable Form Content */}
                        <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">

                            <div className="space-y-1">
                                <label className="text-gray-400 text-sm ml-1">Title</label>
                                <input {...register("title", { required: true })} className="w-full bg-gray-900 border border-white/5 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500/50" placeholder="Summarize your issue..." />
                            </div>

                            <div className="space-y-1 relative">
                                <label className="text-gray-400 text-sm ml-1">Post Type</label>
                                <div className="relative">
                                    <select {...register("postType", { required: true })} className="w-full bg-gray-900 border border-white/5 rounded-lg px-4 py-3 text-white appearance-none outline-none cursor-pointer">
                                        <option value="">Select Type</option>
                                        {PostCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1 relative" ref={suggestionRef}>
                                <label className="text-gray-400 text-sm ml-1">Keywords (Min 4, Max 9)</label>
                                <div className="relative">
                                    <input
                                        onFocus={() => setShowSuggestions(true)}
                                        value={currentKeyword}
                                        onChange={(e) => setCurrentKeyword(e.target.value)}
                                        className="w-full bg-gray-900 border border-white/5 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500/50"
                                        placeholder="Search keywords..."
                                    />
                                    <Search size={18} className="absolute right-4 top-3.5 text-gray-500" />
                                </div>
                                {showSuggestions && (
                                    <div className="absolute z-50 w-full mt-1 bg-[#252533] border border-white/10 rounded-lg shadow-2xl max-h-48 overflow-y-auto ring-1 ring-purple-500/20">
                                        {AvailableKeywords.filter(k => k.toLowerCase().includes(currentKeyword.toLowerCase()) && !keywords.includes(k)).map((k, i) => (
                                            <div key={i} onClick={() => { if (keywords.length < 9) { setKeywords([...keywords, k]); setCurrentKeyword(''); setShowSuggestions(false); } }}
                                                className="p-3 hover:bg-purple-600/30 text-white cursor-pointer text-sm border-b border-white/5 last:border-0 transition-colors">#{k}</div>
                                        ))}
                                    </div>
                                )}
                                {keywordError && <p className="text-[#ff4d4d] text-xs font-medium mt-1">{keywordError}</p>}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {keywords.map((k, i) => (
                                        <span key={i} className="bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-lg text-xs border border-purple-500/20 flex items-center gap-1.5 font-bold transition-all hover:bg-purple-500/20">
                                            #{k} <X size={12} className="cursor-pointer hover:text-white" onClick={() => setKeywords(keywords.filter(item => item !== k))} />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1 relative">
                                <label className="text-gray-400 text-sm ml-1">Content</label>
                                <textarea {...register("description", { required: true })} className="w-full bg-gray-900 border border-white/5 rounded-lg px-4 py-4 text-white h-44 resize-none outline-none focus:border-purple-500/50 transition-all" placeholder="Write your post here..." />
                                {!descriptionValue && <p className="text-[#ff4d4d] text-xs font-medium mt-1">Please describe your issue clearly.</p>}
                            </div>

                            {/* Previews */}
                            {attachments.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {attachments.map((url, index) => (
                                        <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 group shadow-lg">
                                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setAttachments(attachments.filter((_, i) => i !== index))} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 size={18} className="text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                                <p className="text-[#00c853] text-xs font-medium flex items-center gap-2">● You can paste images from clipboard (Ctrl+V).</p>
                                <p className="text-[#00c853] text-xs font-medium flex items-center gap-2">● Max image size: 5MB.</p>
                            </div>
                        </form>

                        {/* Static Footer */}
                        <div className="p-6 flex justify-between items-center border-t border-white/5 bg-[#1c1c28] rounded-b-2xl">
                            <div onClick={() => fileInputRef.current.click()} className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer group transition-all">
                                <div className="w-10 h-10 bg-[#252533] rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                                    {isUploading ? <Loader2 size={18} className="animate-spin text-purple-400" /> : <ImageIcon size={22} className="text-[#00c853]" />}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest">Add Media</span>
                                <input type="file" multiple className="hidden" ref={fileInputRef} onChange={(e) => Array.from(e.target.files).forEach(uploadToImgBB)} accept="image/*" />
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit(onSubmitForm)}
                                disabled={isSubmitting || isUploading || !!keywordError}
                                className="bg-[#5c2d91] hover:bg-[#6e39ac] text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
                            >
                                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "SUBMIT POST"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreatePost;
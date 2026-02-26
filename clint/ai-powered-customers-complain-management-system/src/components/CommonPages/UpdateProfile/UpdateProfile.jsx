import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    IoPersonOutline,
    IoCallOutline,
    IoCameraOutline,
    IoCheckmarkCircleOutline,
    IoArrowBackOutline,
    IoCloudUploadOutline
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateProfile = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        image: ''
    });

    const [currentImage, setCurrentImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    // Fetch current user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    toast.error("Please login first");
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_URL}/user/auth`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.success) {
                    const userData = response.data.data;
                    setFormData({
                        name: userData.name || '',
                        phone_number: userData.phone_number || '',
                        image: userData.image || ''
                    });
                    setCurrentImage(userData.image || '');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [API_URL, navigate]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image selection and upload to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to ImgBB
        setImageUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('key', IMGBB_API_KEY);

            const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (imgbbResponse.data.success) {
                const imageUrl = imgbbResponse.data.data.url;
                setFormData(prev => ({
                    ...prev,
                    image: imageUrl
                }));
                // toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Error uploading image");
        } finally {
            setImageUploading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!formData.phone_number.trim()) {
            toast.error("Phone number is required");
            return;
        }

        setUpdating(true);
        try {
            const token = localStorage.getItem("token");

            const updateData = {
                name: formData.name,
                phone_number: formData.phone_number,
                ...(formData.image && { image: formData.image })
            };

            const response = await axios.patch(`${API_URL}/user/self`, updateData, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            setUpdating(false);
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className=" bg-transparent py-8 px-4">
            <ToastContainer position="top-right" theme="dark" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-20"
                >
                    <button
                        onClick={() => navigate('/view-profile')}
                        className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        <IoArrowBackOutline />
                        <span>Back to Profile</span>
                    </button>

                    <div className="text-center mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                            Update Profile
                        </h1>
                        <p className="text-gray-400">
                            Update your personal information
                        </p>
                    </div>
                </motion.div>

                {/* Main Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 p-6 md:p-8"
                >
                    <form onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-300 mb-4">
                                Profile Picture
                            </label>

                            <div className="flex flex-col items-center">
                                {/* Image Preview */}
                                <div className="relative mb-6">
                                    <div className="relative">
                                        <img
                                            src={previewImage || currentImage || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/50 shadow-xl"
                                        />

                                        {imageUploading && (
                                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                        <div className="absolute -bottom-2 -right-2">
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <div className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                                                    <IoCameraOutline className="text-white text-lg" />
                                                </div>
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    disabled={imageUploading}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm text-center mb-2">
                                    Click the camera icon to upload a new photo
                                </p>
                                <p className="text-gray-500 text-xs text-center">
                                    Supported formats: JPG, PNG, GIF • Max size: 5MB
                                </p>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                <IoPersonOutline className="text-blue-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Phone Number Field */}
                        <div className="mb-8">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                                <IoCallOutline className="text-green-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Current Image Info (if exists) */}
                        {currentImage && !previewImage && (
                            <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                                <p className="text-sm text-blue-300 flex items-center gap-2">
                                    <IoCheckmarkCircleOutline />
                                    Current profile picture is set
                                </p>
                            </div>
                        )}

                        {/* Update Button */}
                        <motion.button
                            type="submit"
                            disabled={updating || imageUploading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl  flex items-center justify-center gap-3"
                        >
                            {updating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <IoCloudUploadOutline className="text-lg" />
                                    Update Profile
                                </>
                            )}
                        </motion.button>

                        {/* Form Info */}
                        <div className="mt-6 pt-6 border-t border-gray-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="text-gray-400">
                                    <p className="font-medium mb-1">Note:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                                        <li>All fields are required</li>
                                        <li>Image uploads to ImgBB</li>
                                    </ul>
                                </div>
                                <div className="text-gray-400">
                                    <p className="font-medium mb-1">Security:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                                        <li>Your data is encrypted</li>
                                        <li>Changes take effect immediately</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Preview Section */}
                {previewImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-green-500/30 p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <h3 className="text-lg font-bold text-green-400">Image Preview</h3>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-2">Current</p>
                                <img
                                    src={currentImage || "https://via.placeholder.com/100"}
                                    alt="Current"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                                />
                            </div>

                            <div className="text-gray-400 text-2xl">→</div>

                            <div className="text-center">
                                <p className="text-green-400 text-sm mb-2">New</p>
                                <img
                                    src={previewImage}
                                    alt="New"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <p className="text-white text-sm font-medium mb-1">Ready to update!</p>
                                <p className="text-gray-400 text-xs">
                                    Click "Update Profile" to save your new profile picture
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

               
            </div>
        </div>
    );
};

export default UpdateProfile;
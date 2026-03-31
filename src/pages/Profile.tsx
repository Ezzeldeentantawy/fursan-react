import React, { useState, useEffect } from 'react'
import { User, Phone, Upload, FileText, CheckCircle, Loader2, XCircle, Eye } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        avatar: null,
        cv: null,
    });
    
    // For showing existing data from the server
    const [existingData, setExistingData] = useState({ avatar_url: '', cv_url: '' });
    // For local image preview
    const [preview, setPreview] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/api/user'); 
                const user = response.data;
                
                setFormData({
                    name: user.name || '',
                    phone: user.phone || '',
                    avatar: null,
                    cv: null,
                });
                console.log("Fetched user data:", user);
                setExistingData({
                    avatar_url: import.meta.env.VITE_API_URL + 'storage/' + user.avatar || '', // Assuming your backend returns these
                    cv_url: user.cv_url || ''
                });
            } catch (err) {
                console.error("Could not fetch user", err);
            } finally {
                setFetching(false);
            }
        };
        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;

        // Validation: Limit size (e.g., 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File is too large (Max 2MB)' });
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: file }));

        // Create preview for images
        if (name === 'avatar') {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const data = new FormData();
        data.append('name', formData.name);
        if (formData.phone) data.append('phone', formData.phone);
        if (formData.avatar) data.append('avatar', formData.avatar);
        if (formData.cv) data.append('cv', formData.cv);

        // Laravel requirement for Multipart spoofing
        data.append('_method', 'POST'); 

        try {
            const response = await api.post('/api/user/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ type: 'success', text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-[#2A69C6]" />
                <p className="mt-4 text-gray-500 font-medium">Syncing your profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 mt-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
                    <p className="text-gray-500">Manage your personal information and documents.</p>
                </div>
                {/* Profile Picture Circle */}
                <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-sm">
                    {preview || existingData.avatar_url ? (
                        <img src={preview || existingData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-full h-full p-4 text-gray-300" />
                    )}
                </div>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-medium text-sm">{message.text}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Ezzeldeen Tantawy"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+971 ..."
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Avatar Upload */}
                    <div className="relative group">
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all">
                            <Upload className="w-8 h-8 text-[#2A69C6] mb-2" />
                            <span className="text-sm font-bold text-gray-700">Change Photo</span>
                            <input type="file" name="avatar" className="hidden" accept="image/*" onChange={handleFileChange} />
                            {formData.avatar && <p className="text-[10px] mt-2 text-blue-600 font-bold italic truncate w-full text-center">{formData.avatar.name}</p>}
                        </label>
                    </div>

                    {/* CV Upload */}
                    <div className="relative group">
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 rounded-2xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                            <FileText className="w-8 h-8 text-emerald-500 mb-2" />
                            <span className="text-sm font-bold text-gray-700">Update CV</span>
                            <input type="file" name="cv" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                            {formData.cv ? (
                                <p className="text-[10px] mt-2 text-emerald-600 font-bold italic truncate w-full text-center">{formData.cv.name}</p>
                            ) : existingData.cv_url && (
                                <a href={existingData.cv_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] mt-2 text-gray-400 hover:text-emerald-600">
                                    <Eye size={10} /> View Current CV
                                </a>
                            )}
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2A69C6] text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-200 disabled:shadow-none flex justify-center items-center gap-2 transform active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    {loading ? 'Processing...' : 'Apply Changes'}
                </button>
            </form>
        </div>
    );
}

export default Profile;
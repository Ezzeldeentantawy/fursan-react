import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Briefcase, MapPin, Clock, ChevronRight, 
    AlertCircle, Loader2, Trash2 
} from 'lucide-react';
import api from '../api/axios';

const CandidateApps = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Helper to extract the correct language string
    const getLang = (val) => {
        if (!val) return 'N/A';
        return typeof val === 'object' ? (val.en || val.ar || '') : val;
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
    try {
        setLoading(true);
        const response = await api.get('/api/candidate/applications');
        
        // Defensive check: extract the array regardless of how the API wraps it
        const data = response.data.applications || response.data.data || response.data;
        
        if (Array.isArray(data)) {
            setApplications(data);
        } else {
            console.error("API did not return an array:", data);
            setApplications([]); // Fallback to empty array to prevent crash
        }
    } catch (err) {
        setError('Failed to load applications.');
        setApplications([]); // Fallback
    } finally {
        setLoading(false);
    }
};

    const getStatusStyle = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-rose-50 text-rose-700 border-rose-200',
        };
        return styles[status?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 text-[#2A69C6] animate-spin" />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Applied Jobs</h1>
                <p className="text-gray-500 mt-2">You have applied to {applications.length} positions.</p>
            </header>

            {applications.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                    <Briefcase className="text-gray-300 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No applications found</h3>
                    <button onClick={() => navigate('/jobs')} className="mt-4 text-[#2A69C6] font-bold hover:underline">
                        Find your next role →
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div 
                            key={app.id}
                            className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-100 transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    {/* Icon Placeholder */}
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2A69C6] border border-gray-100 group-hover:bg-blue-50 transition-colors">
                                        <Briefcase className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2A69C6] transition-colors cursor-pointer" onClick={() => navigate(`/jobs/${app.job_id}`)}>
                                            {getLang(app.job?.title)}
                                        </h3>
                                        
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 font-medium text-gray-700">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                {getLang(app.job?.location)}
                                            </div>
                                            <div className="flex items-center gap-1.5 capitalize">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                {app.job?.type}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {new Date(app.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${getStatusStyle(app.status)} uppercase tracking-widest`}>
                                        {app.status}
                                    </span>
                                    
                                    <button 
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Withdraw Application"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to withdraw your application?")) {
                                                api.delete(`/api/candidate/applications/${app.id}`);
                                            }
                                        }}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <ChevronRight className="hidden lg:block w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CandidateApps;
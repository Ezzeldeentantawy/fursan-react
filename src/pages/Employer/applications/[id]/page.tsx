import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail, Phone, User, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const JobApplicationsDetail = () => {
    const { id } = useParams(); // Grabs the ID from the URL
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                // 1. Fetch the applications for this specific job
                const res = await api.get(`/api/employer/jobs/${id}/applications`);
                const data = res.data.data || res.data;
                console.log("Fetched applications:", data);
                setApplications(Array.isArray(data) ? data : []);

                // 2. Optional: Fetch job details to show the title at the top
                const jobRes = await api.get(`/api/employer/jobs/${id}`);
                setJobTitle(jobRes.data.title?.en || 'Job');
            } catch (err) {
                console.error("Error fetching applications:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchApplications();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#2A69C6]" />
                <p className="mt-4 text-gray-500">Loading applications...</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto font-sans">
            {/* Header with Back Button */}
            <div className="mb-8">
                <Link 
                    to="/employer/dashboard/applications" 
                    className="flex items-center gap-2 text-gray-500 hover:text-[#2A69C6] transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Jobs
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Applications for <span className="text-[#2A69C6]">{jobTitle}</span>
                </h1>
                <p className="text-gray-500 mt-2">Total Applicants: {applications.length}</p>
            </div>

            {/* Applications List */}
            <div className="grid gap-4">
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                {/* Avatar Placeholder */}
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                    {app.candidate?.avatar ? (
                                        <img 
                                            src={`${import.meta.env.VITE_API_URL}storage/${app.candidate.avatar}`}
                                            alt={app.candidate.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <User className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{app.candidate?.name || 'Unknown Candidate'}</h3>
                                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3.5 h-3.5" /> {app.candidate?.email}
                                        </span>
                                        {app.candidate?.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3.5 h-3.5" /> {app.candidate.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* CV Action */}
                            <div className="flex gap-3 w-full md:w-auto">
                                {app.candidate?.cv ? (
                                    <a 
                                        href={`${import.meta.env.VITE_API_URL}storage/${app.candidate.cv}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition-colors border border-green-200"
                                    >
                                        <FileText className="w-4 h-4" />
                                        View CV
                                    </a>
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No CV uploaded</span>
                                )}
                                
                                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
                                    Contact
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400">No applications found for this position.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplicationsDetail;
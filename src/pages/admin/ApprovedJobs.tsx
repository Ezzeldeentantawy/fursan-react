import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Trash2, CheckCircle, Globe } from "lucide-react"; // Using Lucide for better UI

const ApprovedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en');

    useEffect(() => {
        const fetchApprovedJobs = async () => {
            try {
                const res = await api.get('/api/admin/jobs');
                const allJobs = Array.isArray(res.data.data) ? res.data.data : res.data.jobs;
                
                // FILTER: Only show jobs that are approved
                const filtered = allJobs.filter(job => job.status === 'approved');
                
                setJobs(filtered);
            } catch (err) {
                console.error("Error fetching approved jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedJobs();
    }, []);

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this live job?")) return;
        
        try {
            await api.delete(`/api/admin/jobs/${jobId}`);
            setJobs(jobs.filter(job => job.id !== jobId));
            alert("Job deleted successfully.");
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Could not delete job.");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading live jobs...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Live Jobs ({jobs.length})</h1>
                        <p className="text-gray-500">Currently active postings on the platform</p>
                    </div>
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
                    >
                        {lang === 'en' ? 'عرض بالعربية' : 'Switch to English'}
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-white p-12 rounded-[32px] shadow-sm text-center">
                        <Globe className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No approved jobs found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-[25px] border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-6">
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle size={12} /> Active
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            ID: #{job.id}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{job.title[lang]}</h2>
                                    <p className="text-[#2A69C6] font-medium mb-4">📍 {job.location[lang]}</p>

                                    <div className="bg-slate-50 p-4 rounded-2xl">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Employer Details</h4>
                                        <p className="text-sm text-slate-700 font-semibold">{job.employer?.name}</p>
                                        <p className="text-xs text-slate-500">{job.employer?.email}</p>
                                    </div>
                                </div>

                                <div className="md:w-56 flex flex-col justify-end border-t md:border-t-0 md:border-l border-gray-50 pt-4 md:pt-0 md:pl-6">
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                        Delete Job
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApprovedJobs;
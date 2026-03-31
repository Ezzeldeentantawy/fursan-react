import api from "../../api/axios";
import { useEffect, useState } from "react";
// Import Link for navigation
import { Link } from "react-router-dom"; 
import { Eye } from "lucide-react"; // Optional: adding an icon

const JobApplications = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobsAndApplications = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/employer/jobs');
            const allJobs = Array.isArray(res.data.data || res.data) ? (res.data.data || res.data) : [];

            const jobsWithApps = await Promise.all(
                allJobs.map(async (job) => {
                    try {
                        const appRes = await api.get(`/api/employer/jobs/${job.id}/applications`);
                        const applications = appRes.data.data || [];
                        return { ...job, appCount: applications.length };
                    } catch (err) {
                        return { ...job, appCount: 0 };
                    }
                })
            );

            const filteredJobs = jobsWithApps.filter(job => job.appCount > 0);
            setJobs(filteredJobs);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobsAndApplications();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500 font-medium">Filtering active applications...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto font-sans">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Manage Applications</h1>
            
            <div className="grid gap-6">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">
                                    {job.title?.en?.charAt(0) || 'J'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">{job.title?.en}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">📍 {job.location?.en}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="font-bold text-blue-600">{job.appCount} Applications</span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            job.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            job.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* --- NEW ACTION BUTTON --- */}
                            <div className="mt-4 md:mt-0">
                                <Link 
                                    to={`/employer/dashboard/applications/${job.id}`}
                                    className="flex items-center gap-2 bg-[#2A69C6] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <Eye className="w-4 h-4" />
                                    View Applications
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No jobs have received applications yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplications;
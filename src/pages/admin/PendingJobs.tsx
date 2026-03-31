import api from "../../api/axios";
import { useEffect, useState } from "react";

const PendingJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('en'); // You can toggle this to 'ar'

    useEffect(() => {
        const fetchPendingJobs = async () => {
            try {
                const res = await api.get('/api/admin/jobs');

                // 1. Get the raw array from your response
                const allJobs = Array.isArray(res.data.data) ? res.data.data : res.data.jobs;

                // 2. Filter for only jobs with status 'pending'
                // Replace 'pending' with whatever your backend uses (e.g., 0 or 'unapproved')
                const filteredJobs = allJobs.filter(job => job.status === 'pending');

                setJobs(filteredJobs);
                console.log("Filtered pending jobs:", filteredJobs);
            } catch (err) {
                console.error("Error fetching pending jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingJobs();
    }, []);

    const handleApprove = async (jobId) => {
        try {
            await api.patch(`/api/admin/jobs/${jobId}/approve`);
            // Remove the job from the UI list once approved
            setJobs(jobs.filter(job => job.id !== jobId));
            alert("Job approved successfully!");
        } catch (err) {
            console.error("Approval failed:", err);
            alert("Could not approve job.");
        }
    };
    const handleReject = async (jobId) => {
        try {
            await api.patch(`/api/admin/jobs/${jobId}/reject`);
            // Remove the job from the UI list once rejected
            setJobs(jobs.filter(job => job.id !== jobId));
            alert("Job rejected successfully!");
        } catch (err) {
            console.error("Reject failed:", err);
            alert("Could not reject job.");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading pending jobs...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 font-['Roboto']">
                        Pending Job Approvals ({jobs.length})
                    </h1>
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                        className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                        Switch to {lang === 'en' ? 'Arabic' : 'English'}
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
                        No pending jobs to review.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-[25px] border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">

                                {/* 1. Job Identity & Employer */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-[#E8F4FE] text-[#2A69C6] text-xs font-bold uppercase px-3 py-1 rounded-full">
                                            {job.type}
                                        </span>
                                        <span className="text-gray-400 text-sm italic">
                                            Posted on {new Date(job.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-[#0D47A1] mb-1">
                                        {job.title[lang]}
                                    </h2>

                                    <p className="text-gray-600 font-medium mb-4 flex items-center gap-2">
                                        <span className="text-[#2A69C6]">📍 {job.location[lang]}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-sm">Employer: {job.employer.name} ({job.employer.email})</span>
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-gray-700 underline mb-1">Description</h4>
                                            <div className="text-gray-600 prose max-w-none" dangerouslySetInnerHTML={{ __html: job.job_description[lang] }} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-700 underline mb-1">Requirements</h4>
                                            <div className="text-gray-600 prose max-w-none" dangerouslySetInnerHTML={{ __html: job.requirements[lang] }} />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Overview & Action Column */}
                                <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase">Benefits</h4>
                                        <div className="text-sm text-gray-600 mb-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: job.benefits[lang] }} />

                                        <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase">Company Overview</h4>
                                        <div className="text-sm text-gray-500 prose max-w-none" dangerouslySetInnerHTML={{ __html: job.overview[lang] }} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleApprove(job.id)}
                                            className="w-full bg-[#2A69C6] text-white py-3 rounded-xl font-bold hover:bg-[#1e4b8f] transition-colors shadow-lg shadow-blue-100"
                                        >
                                            Approve Job
                                        </button>
                                        <button
                                            onClick={() => handleReject(job.id)}
                                            className="w-full bg-white border border-red-200 text-red-500 py-2 rounded-xl text-sm hover:bg-red-50 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingJobs;
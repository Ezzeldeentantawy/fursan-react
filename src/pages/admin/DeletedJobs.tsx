import api from "../../api/axios";
import { useEffect, useState } from "react";

const DeletedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeletedJobs = async () => {
        setLoading(true);
        try {
            // Your API route should point to a controller using ->onlyTrashed()
            const res = await api.get('/api/admin/trashed');
            const data = res.data.data || res.data;
            setJobs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching trashed jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDeletedJobs(); }, []);

    const handleRestore = async (id) => {
        try {
            await api.patch(`/api/admin/jobs/${id}/restore`);
            setJobs(jobs.filter(job => job.id !== id));
            alert("Job restored successfully!");
        } catch (err) {
            alert("Failed to restore job.");
        }
    };

    const handlePermanentDelete = async (id) => {
        if (!window.confirm("WARNING: This will permanently delete the job. This action cannot be undone!")) return;
        try {
            await api.delete(`/api/admin/jobs/${id}/`);
            setJobs(jobs.filter(job => job.id !== id));
        } catch (err) {
            alert("Failed to permanently delete.");
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Loading trash...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                    🗑️
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Deleted Archives</h1>
            </div>

            {jobs.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[30px] p-20 text-center text-gray-500">
                    The trash is empty.
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center opacity-75 hover:opacity-100 transition-opacity">
                            <div>
                                <h3 className="font-bold text-lg text-gray-700 line-through decoration-gray-400">
                                    {job.title?.en}
                                </h3>
                                <p className="text-xs text-red-500 font-medium mt-1">
                                    Deleted on: {new Date(job.deleted_at).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-4 md:mt-0">
                                <button 
                                    onClick={() => handleRestore(job.id)}
                                    className="px-6 py-2 bg-green-50 text-green-600 rounded-xl font-bold hover:bg-green-100 transition-colors border border-green-100"
                                >
                                    Restore
                                </button>
                                <button 
                                    onClick={() => handlePermanentDelete(job.id)}
                                    className="px-6 py-2 bg-gray-50 text-gray-400 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"
                                >
                                    Permanent Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeletedJobs;
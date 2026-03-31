import api from "../../api/axios";
import { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";

const KeyValueEditor = ({ value = {}, onChange, lang }) => {
    const entries = Object.entries(value);

    const updateKey = (oldKey, newKey) => {
        const updated = {};
        Object.entries(value).forEach(([k, v]) => {
            updated[k === oldKey ? newKey : k] = v;
        });
        onChange(updated);
    };

    const updateValue = (key, newVal) => {
        onChange({ ...value, [key]: newVal });
    };

    const addRow = () => {
        const newKey = `field_${Date.now()}`;
        onChange({ ...value, [newKey]: '' });
    };

    const removeRow = (key) => {
        const updated = { ...value };
        delete updated[key];
        onChange(updated);
    };

    return (
        <div className="space-y-2">
            {entries.map(([key, val]) => (
                <div key={key} className="flex gap-2 items-center">
                    <input
                        className="w-1/3 p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none text-sm"
                        placeholder={lang === 'en' ? 'Key (e.g. Experience)' : 'المفتاح'}
                        value={key.startsWith('field_') ? '' : key}
                        onChange={(e) => updateKey(key, e.target.value)}
                    />
                    <input
                        className="flex-1 p-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2A69C6] outline-none text-sm"
                        placeholder={lang === 'en' ? 'Value' : 'القيمة'}
                        value={val}
                        onChange={(e) => updateValue(key, e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => removeRow(key)}
                        className="text-red-400 hover:text-red-600 px-2 text-lg font-bold"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addRow}
                className="text-[#2A69C6] text-sm font-semibold hover:underline mt-1"
            >
                + Add field
            </button>
        </div>
    );
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editLang, setEditLang] = useState('en');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/employer/jobs');
            const data = res.data.data || res.data;
            setJobs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/api/employer/jobs/${id}`);
            setJobs(jobs.filter(job => job.id !== id));
        } catch (err) { alert("Failed to delete"); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!selectedJob.is_easy_apply && !selectedJob.apply_link?.trim()) {
            alert("Apply link is required when Easy Apply is disabled.");
            return;
        }


        setIsUpdating(true);

        try {
            const payload = {
                type: selectedJob.type,
                is_easy_apply: selectedJob.is_easy_apply ? 1 : 0,
                ...((!selectedJob.is_easy_apply && selectedJob.apply_link)
                    ? { apply_link: selectedJob.apply_link }
                    : {}),
                title: { en: selectedJob.title?.en || '', ar: selectedJob.title?.ar || '' },
                location: { en: selectedJob.location?.en || '', ar: selectedJob.location?.ar || '' },
                details: {
                    en: JSON.stringify(selectedJob.details?.en || {}),
                    ar: JSON.stringify(selectedJob.details?.ar || {})
                },
                job_description: { en: selectedJob.job_description?.en || '', ar: selectedJob.job_description?.ar || '' },
                requirements: { en: selectedJob.requirements?.en || '', ar: selectedJob.requirements?.ar || '' },
                benefits: { en: selectedJob.benefits?.en || '', ar: selectedJob.benefits?.ar || '' },
                overview: { en: selectedJob.overview?.en || '', ar: selectedJob.overview?.ar || '' },
            };

            await api.put(`/api/employer/jobs/${selectedJob.id}`, payload);
            setSelectedJob(null);
            fetchJobs();
            alert("Updated successfully!");
        } catch (err) {
            console.error(err.response?.data);
            alert("Update failed. Check console for details.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleNestedChange = (field, lang, value) => {
        setSelectedJob(prev => ({
            ...prev,
            [field]: { ...prev[field], [lang]: value }
        }));
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading your listings...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto font-sans">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Manage Jobs</h1>

            {/* --- EDIT MODAL --- */}
            {selectedJob && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
                        <form onSubmit={handleUpdate} className="p-8">
                            <div className="flex justify-between items-center mb-8 border-b pb-6">
                                <h2 className="text-2xl font-bold text-blue-700">Edit Job Listing</h2>
                                <div className="flex bg-gray-100 rounded-xl p-1.5 border border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setEditLang('en')}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${editLang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >English</button>
                                    <button
                                        type="button"
                                        onClick={() => setEditLang('ar')}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${editLang === 'ar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >العربية</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Type is the only non-localized string here */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Job Type</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={selectedJob.type}
                                        onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}
                                    >
                                        <option value="onsite">On-Site</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                </div>

                                {/* Easy Apply */}
                                <div className="md:col-span-2 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            onClick={() => setSelectedJob(prev => ({
                                                ...prev,
                                                is_easy_apply: !prev.is_easy_apply,
                                                apply_link: !prev.is_easy_apply ? '' : prev.apply_link, // clear on enable
                                            }))}
                                            className={`w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center rounded-[5px] border cursor-pointer transition-colors duration-150 ${selectedJob.is_easy_apply
                                                    ? 'bg-emerald-600 border-emerald-700'
                                                    : 'bg-white border-gray-300'
                                                }`}
                                        >
                                            {selectedJob.is_easy_apply && (
                                                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                                    <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <label className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                            Easy Apply
                                        </label>
                                    </div>

                                    {!selectedJob.is_easy_apply && (
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Apply Link <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-gray-400">
                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" />
                                                        <path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" />
                                                    </svg>
                                                </span>
                                                <input
                                                    type="url"
                                                    value={selectedJob.apply_link || ''}
                                                    onChange={(e) => setSelectedJob(prev => ({ ...prev, apply_link: e.target.value }))}
                                                    placeholder="https://yourcompany.com/careers/apply"
                                                    className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Map through localized fields INCLUDING location */}
                                {[
                                    { id: 'title', label: 'Job Title', type: 'input' },
                                    { id: 'location', label: 'Location', type: 'input' }, // Handled as object
                                    { id: 'details', label: 'Subtitle/Details', type: 'kv' },
                                    { id: 'job_description', label: 'Job Description', type: 'rich' },
                                    { id: 'requirements', label: 'Requirements', type: 'rich' },
                                    { id: 'benefits', label: 'Benefits', type: 'rich' },
                                    { id: 'overview', label: 'Company Overview', type: 'rich' },
                                ].map((field) => (
                                    <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2 space-y-2' : 'space-y-2'}>
                                        <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                                            {field.label} ({editLang.toUpperCase()})
                                        </label>
                                        {field.type === 'input' ? (
                                            <input
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={selectedJob[field.id]?.[editLang] || ''}
                                                onChange={(e) => handleNestedChange(field.id, editLang, e.target.value)}
                                                required
                                            />
                                        ) : field.type === 'kv' ? (
                                            <KeyValueEditor
                                                lang={editLang}
                                                value={selectedJob[field.id]?.[editLang] || {}}
                                                onChange={(val) => handleNestedChange(field.id, editLang, val)}
                                            />
                                        ) : (
                                            <RichTextEditor
                                                lang={editLang}
                                                value={selectedJob[field.id]?.[editLang] || ''}
                                                onChange={(val) => handleNestedChange(field.id, editLang, val)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-10 justify-end border-t pt-8">
                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(null)}
                                    className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                                >Cancel</button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                                >{isUpdating ? "Saving..." : "Save Changes"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- LIST VIEW --- */}
            <div className="grid gap-6">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">
                                {job.title.en?.charAt(0) || 'J'}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">{job.title.en}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1">📍 {job.location.en}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${job.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        job.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
                            <button
                                onClick={() => {
                                    const normalizeDetails = (val) => {
                                        if (typeof val === 'string') {
                                            try { return JSON.parse(val); } catch { return {}; }
                                        }
                                        return val && typeof val === 'object' ? val : {};
                                    };
                                    setSelectedJob({
                                        ...job,
                                        details: {
                                            en: normalizeDetails(job.details?.en),
                                            ar: normalizeDetails(job.details?.ar),
                                        }
                                    });
                                }}
                                className="flex-1 md:flex-none px-8 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-100 transition-colors"
                            >Edit</button>
                            <button
                                onClick={() => handleDelete(job.id)}
                                className="flex-1 md:flex-none px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors"
                            >Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
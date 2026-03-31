import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added ExternalLink icon
import { BookmarkCheck, Save, Maximize2, Zap, ExternalLink } from 'lucide-react'; 
import RichSection from './RichSection';
import { getVal } from './utils/jobUtils';
import api from '../../api/axios';
import Modal from './modal';

const NAV_SECTIONS = [
    { id: 'desc-heading', label: 'Description', field: 'job_description' },
    { id: 'req-heading', label: 'Requirements', field: 'requirements' },
    { id: 'ben-heading', label: 'Benefits', field: 'benefits' },
    { id: 'overview-heading', label: 'Overview', field: 'overview' },
];

const JobDetail = ({ job, isBookmarked, onBookmark }) => {
    const scrollRef = useRef(null);

    const navigate = useNavigate(); // Add this line

    const [popup, setPopup] = useState({
        show: false,
        title: '',
        message: '',
        actionLabel: '',
        onAction: () => {}
    });

    const closePopup = () => setPopup({ ...popup, show: false });

    const handleEasyApply = async () => {
        try {
            await api.post(`/api/jobs/${job.id}/apply`);
            setPopup({
                show: true,
                title: 'Success!',
                message: 'Your application has been submitted successfully.',
                actionLabel: 'View Applications',
                onAction: () => navigate('/profile/applications')
            });
        } catch (err) {
            const status = err.response?.status;
            const data = err.response?.data;

            if (status === 401) {
                setPopup({
                    show: true,
                    title: 'Login Required',
                    message: 'You need an account to apply for this job.',
                    actionLabel: 'Register Now',
                    onAction: () => navigate('/register')
                });
            } 
            else if (status === 403) {
                const destination = data?.role === 'admin' ? '/admin' : '/employer';
                setPopup({
                    show: true,
                    title: 'Wrong Account Type',
                    message: 'Only candidates can apply. Redirecting to your dashboard...',
                    actionLabel: 'Go to Dashboard',
                    onAction: () => navigate(destination)
                });
            } 
            else if (status === 422) {
                setPopup({
                    show: true,
                    title: 'CV Missing',
                    message: 'Please upload a CV to your profile before applying.',
                    actionLabel: 'Go to Profile',
                    onAction: () => navigate('/profile')
                });
            }
            else {
                setPopup({
                    show: true,
                    title: 'Notice',
                    message: data?.message || 'An error occurred.',
                    actionLabel: 'Close',
                    onAction: closePopup
                });
            }
        }
    };

    const scrollToSection = (id) => {
        const container = scrollRef.current;
        const target = container?.querySelector(`#${id}`);
        if (!container || !target) return;
        container.scrollTo({
            top: target.offsetTop - 160,
            behavior: 'smooth',
        });
    };

    if (!job) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm min-h-[300px]">
                Select a job to view details
            </div>
        );
    }

    const availableSections = NAV_SECTIONS.filter(({ field }) => {
        const val = job[field];
        return val && getVal(val);
    });
    const isEasyApply = job.is_easy_apply == true;
    const applyUrl = job.apply_link || '#'; // Assuming 'apply_link' is the field name

    return (
        <div className="flex flex-col h-full max-h-[70vh] lg:max-h-[calc(100vh-220px)]">
            <Modal 
                isOpen={popup.show}
                onClose={closePopup}
                title={popup.title}
                message={popup.message}
                actionLabel={popup.actionLabel}
                onAction={popup.onAction}
            />
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 lg:p-12">
                <header className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                        <h3 className="text-[#2A69C6] font-semibold text-lg truncate">
                            {job.employer?.name}
                        </h3>
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#141514] mt-2">
                            {getVal(job.title)}
                        </h2>
                        <p className="text-base font-medium text-[#555] mt-1">
                            {getVal(job.location)}
                            {job.type ? ` (${job.type})` : ''}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-6 flex-shrink-0">
                        <div className="flex gap-4">
                            <button
                                aria-label={isBookmarked ? 'Remove bookmark' : 'Save job'}
                                onClick={() => onBookmark(job.id)}
                                className="p-1 rounded hover:bg-gray-200 transition-colors"
                            >
                                {isBookmarked
                                    ? <BookmarkCheck className="w-6 h-6 text-blue-500" />
                                    : <Save className="w-6 h-6 text-gray-400" />
                                }
                            </button>
                            <button
                                aria-label="Open full view"
                                className="p-1 rounded hover:bg-gray-200 transition-colors"
                            >
                                <Maximize2 className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Conditional Apply Button */}
                        {isEasyApply ? (
                            <button
                            onClick={handleEasyApply}
                            className="bg-[#41A8F4] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-md hover:bg-[#2a96e8] transition-colors">
                                <Zap className="w-5 h-5 fill-current" aria-hidden="true" />
                                Easy Apply
                            </button>
                        ) : (
                            <a 
                                href={applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-md hover:bg-black transition-colors"
                            >
                                Apply
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </header>

                {/* ... rest of your component (Details, Nav, RichSections) ... */}
                {job.details && (() => {
                    const raw = job.details?.en ?? job.details;
                    const parsed = typeof raw === 'string' ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : raw;
                    const entries = parsed && typeof parsed === 'object' ? Object.entries(parsed) : [];
                    return entries.length > 0 ? (
                        <div className="border-none my-8">
                            <div className="flex flex-col gap-x-10 gap-y-6">
                                {entries.map(([key, val]) => (
                                    <p key={key} className="min-w-[120px] text-[#141514]">
                                        <b>{key}:</b> {val}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ) : null;
                })()}

                {availableSections.length > 1 && (
                    <nav className="flex gap-6 pt-4 pb-0 border-b border-[#E5EAE8] scrollbar-none flex-shrink-0">
                        {availableSections.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollToSection(id)}
                                className="py-2 text-sm font-medium text-[#767977] whitespace-nowrap border-b-2 border-transparent hover:text-[#2A69C6] hover:border-[#2A69C6] transition-colors -mb-px"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                )}

                <div className="mt-12 space-y-8">
                    <RichSection id="desc-heading" label="Description" html={job.job_description} />
                    <RichSection id="req-heading" label="Requirements" html={job.requirements} />
                    <RichSection id="ben-heading" label="Benefits" html={job.benefits} />
                    <RichSection id="overview-heading" label="Overview" html={job.overview} />
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
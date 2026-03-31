import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../../api/axios';
import JobSearchBar from './JobSearchBar';
import JobList from './JobList';
import JobDetail from './JobDetail';
import { getVal } from './utils/jobUtils';

const JobPortal = () => {
    const [jobs, setJobs] = useState([]);
    const [activeJobId, setActiveJobId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [titleQuery, setTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [bookmarks, setBookmarks] = useState(() => {
        try {
            return new Set(JSON.parse(localStorage.getItem('job_bookmarks') ?? '[]'));
        } catch {
            return new Set();
        }
    });

    // Fetch jobs once on mount
    useEffect(() => {
        let cancelled = false;

        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get('/api/jobs');
                const data = res.data?.data ?? res.data;

                if (!Array.isArray(data)) throw new Error('Unexpected API response shape.');

                if (!cancelled) {
                    setJobs(data);
                    if (data.length > 0) setActiveJobId(data[0].id);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('Failed to fetch jobs:', err);
                    setError(err.message ?? 'Something went wrong.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchJobs();
        return () => { cancelled = true; };
    }, []);

    // Persist bookmarks whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('job_bookmarks', JSON.stringify([...bookmarks]));
        } catch {
            // storage unavailable (private mode, quota exceeded)
        }
    }, [bookmarks]);

    // Client-side filtering
    const filteredJobs = useMemo(() => {
        const title = titleQuery.trim().toLowerCase();
        const location = locationQuery.trim().toLowerCase();
        if (!title && !location) return jobs;

        return jobs.filter((job) => {
            const matchTitle = !title || getVal(job.title).toLowerCase().includes(title);
            const matchLocation = !location || getVal(job.location).toLowerCase().includes(location);
            return matchTitle && matchLocation;
        });
    }, [jobs, titleQuery, locationQuery]);

    const selectedJob = useMemo(
        () => jobs.find((j) => j.id === activeJobId) ?? null,
        [jobs, activeJobId]
    );

    const handleBookmark = useCallback((jobId) => {
        setBookmarks((prev) => {
            const next = new Set(prev);
            next.has(jobId) ? next.delete(jobId) : next.add(jobId);
            return next;
        });
    }, []);

    // Sync active job when filtered list changes and current selection is hidden
    useEffect(() => {
        if (filteredJobs.length === 0) {
            setActiveJobId(null);
        } else if (!filteredJobs.some((j) => j.id === activeJobId)) {
            setActiveJobId(filteredJobs[0].id);
        }
    }, [filteredJobs, activeJobId]);

    // ---------------------------------------------------------------------------
    // Render states
    // ---------------------------------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
                Loading jobs…
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-red-500">
                <p className="font-medium">Failed to load jobs</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <JobSearchBar
                titleQuery={titleQuery}
                locationQuery={locationQuery}
                onTitleChange={setTitleQuery}
                onLocationChange={setLocationQuery}
            />

            <section className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 pb-20">
                {/* Sidebar */}
                <aside
                    aria-label="Job listings"
                    className="w-full lg:w-[35%] max-h-[70vh] lg:max-h-[calc(100vh-220px)] overflow-y-auto border border-gray-100 rounded-lg shadow-sm"
                >
                    <JobList
                        jobs={filteredJobs}
                        activeJobId={activeJobId}
                        bookmarks={bookmarks}
                        onSelect={setActiveJobId}
                        onBookmark={handleBookmark}
                    />
                </aside>

                {/* Detail Panel */}
                <main
                    aria-label="Job details"
                    className="flex-1 bg-[#F6FBFF] rounded-lg border border-[#E5EAE8] overflow-hidden"
                >
                    <JobDetail
                        job={selectedJob}
                        isBookmarked={bookmarks.has(selectedJob?.id)}
                        onBookmark={handleBookmark}
                    />
                </main>
            </section>
        </div>
    );
};

export default JobPortal;
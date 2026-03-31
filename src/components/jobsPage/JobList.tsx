import JobCard from './JobCard';

const JobList = ({ jobs, activeJobId, bookmarks, onSelect, onBookmark }) => {
    if (jobs.length === 0) {
        return (
            <div className="p-10 text-center text-sm text-gray-400">
                No jobs match your search.
            </div>
        );
    }

    return (
        <>
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isActive={activeJobId === job.id}
                    isBookmarked={bookmarks.has(job.id)}
                    onSelect={onSelect}
                    onBookmark={onBookmark}
                />
            ))}
        </>
    );
};

export default JobList;
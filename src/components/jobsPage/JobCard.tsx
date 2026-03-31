import { useCallback } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import CompanyAvatar from './CompanyAvatar';
import { getVal, timeAgo } from './utils/jobUtils';

const JobCard = ({ job, isActive, onSelect, onBookmark, isBookmarked }) => {
    const handleBookmark = useCallback((e) => {
        e.stopPropagation(); // prevent card click from firing
        onBookmark(job.id);
    }, [job.id, onBookmark]);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`View ${getVal(job.title)} at ${job.employer?.name}`}
            onClick={() => onSelect(job.id)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(job.id)}
            className={`flex justify-between p-5 border-b border-[#E5EAE8] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isActive ? 'bg-[#FAFEFC]' : 'hover:bg-gray-50'
            }`}
        >
            {/* Left */}
            <div className="w-4/5 min-w-0">
                <h3 className="flex items-center gap-2 text-[#8C8F8E] font-medium text-sm capitalize">
                    <CompanyAvatar image={job.image} name={job.employer?.name} />
                    <span className="truncate">{job.employer?.name}</span>
                </h3>
                <h2 className="text-lg font-medium text-black my-3 line-clamp-2">
                    {getVal(job.title)}
                </h2>
                <p className="text-xs font-medium text-[#767977] mb-4 uppercase tracking-wide">
                    {getVal(job.location)} {job.type ? `• ${job.type}` : ''}
                </p>
                <div className="flex gap-2 flex-wrap">
                    <span className="border border-[#2A69C6] px-3 py-1 rounded-full text-[#2A69C6] text-[10px] font-semibold select-none">
                        Easy Apply
                    </span>
                </div>
            </div>

            {/* Right */}
            <div className="w-1/5 flex flex-col justify-between items-end pl-2">
                <button
                    onClick={handleBookmark}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
                    className="p-1 -mr-1 rounded hover:bg-gray-100 transition-colors"
                >
                    {isBookmarked
                        ? <BookmarkCheck className="w-5 h-5 text-blue-500" />
                        : <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    }
                </button>
                <time
                    dateTime={job.created_at}
                    className="text-xs font-medium text-[#767977] whitespace-nowrap"
                >
                    {timeAgo(job.created_at)}
                </time>
            </div>
        </div>
    );
};

export default JobCard;
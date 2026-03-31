import { useCallback } from 'react';
import { Search, MapPin } from 'lucide-react';

const JobSearchBar = ({ titleQuery, locationQuery, onTitleChange, onLocationChange }) => {
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        // Filtering is reactive — this just prevents page reload.
    }, []);

    return (
        <section className="py-16 px-4">
            <form
                onSubmit={handleSubmit}
                role="search"
                aria-label="Job search"
                className="max-w-[808px] mx-auto border border-[#CFD4D1] shadow-sm rounded-full py-2.5 pl-8 pr-2 flex items-center bg-white"
            >
                <input
                    type="search"
                    value={titleQuery}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Job Title"
                    aria-label="Search by job title"
                    className="w-[46%] h-10 border-r border-[#B8BDBB] outline-none text-lg font-medium text-[#333434] bg-transparent"
                />
                <div className="flex items-center w-[46%] pl-8 gap-2">
                    <MapPin className="text-gray-400 w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <input
                        type="search"
                        value={locationQuery}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="Location"
                        aria-label="Search by location"
                        className="w-full h-10 outline-none text-lg font-medium text-[#333434] bg-transparent"
                    />
                </div>
                <button
                    type="submit"
                    aria-label="Search"
                    className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                    <Search className="w-5 h-5" aria-hidden="true" />
                </button>
            </form>
        </section>
    );
};

export default JobSearchBar;
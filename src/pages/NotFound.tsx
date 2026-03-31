import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
                    <svg className="h-full w-full" aria-hidden="true">
                        <defs>
                            <pattern id="grid" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            <div className="text-center">
                {/* Icon & Error Code */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-blue-50 p-4 ring-1 ring-blue-100">
                        <Search className="h-12 w-12 text-[#2A69C6]" />
                    </div>
                </div>
                
                <p className="mt-6 text-base font-semibold leading-7 text-[#41A8F4]">404 Error</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Job Position Not Found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
                    Sorry, we couldn’t find the page you’re looking for. It might have been filled, 
                    removed, or the URL might be mistyped.
                </p>

                {/* Action Buttons */}
                <div className="mt-10 flex items-center justify-center gap-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 rounded-full bg-[#2A69C6] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1e4e96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>

                {/* Helpful Links/Quick Nav */}
                <div className="mt-16 border-t border-gray-200 pt-10">
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Try searching for:</h2>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        {['Remote Jobs', 'Engineering', 'Marketing', 'Design'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => navigate('/jobs')}
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200 hover:ring-gray-300"
                            >
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
import React, { useState, useRef, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const JobPreviewSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(0);
    const [lang] = useState('en');
    const sliderRef = useRef(null);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/api/jobs');
            const data = res.data.data || res.data;
            setJobs(data.slice(0, 8));
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    const scroll = (direction) => {
        const cardWidth = 298 + 20; // card width + gap
        const containerWidth = sliderRef.current?.offsetWidth || 0;
        const maxScroll = -(jobs.length * cardWidth - containerWidth);
        const move = direction === 'next' ? -cardWidth : cardWidth;

        setPosition(prev => {
            const newPos = prev + move;
            if (newPos > 0) return 0;
            if (newPos < maxScroll) return maxScroll;
            return newPos;
        });
    };

    if (loading) return (
        <div className="py-20 text-center bg-[#E8F4FE] text-[#0D47A1] font-bold">
            Loading Positions...
        </div>
    );

    return (
        <section
            className="py-16 bg-[#E8F4FE] overflow-hidden"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
            <div className="max-w-full">

                {/* Header */}
                <div className="max-w-[1300px] mx-auto px-4 flex justify-between items-center mb-10">
                    <h2 className="font-['Roboto'] font-bold text-4xl md:text-[60px] leading-tight text-[#0D47A1] capitalize m-0">
                        {lang === 'en' ? 'Open Positions Preview' : 'وظائف شاغرة'}
                    </h2>
                    <Link
                        to="/jobs"
                        className="flex items-center gap-2 font-['Roboto'] font-semibold text-xl md:text-[22px] uppercase text-[#2597F3] no-underline tracking-wide"
                    >
                        {lang === 'en' ? 'SEE ALL' : 'عرض الكل'}
                        <span className="text-[#2597F3] text-2xl">→</span>
                    </Link>
                </div>

                {/* Content Wrapper */}
                <div className="flex flex-wrap lg:flex-nowrap gap-[30px] px-4">

                    {/* Slider Column (~75%) */}
                    <div className="w-full lg:w-[75%] relative pb-[80px]">
                        <div className="overflow-hidden">
                            <div
                                ref={sliderRef}
                                className="flex gap-5 transition-transform duration-500 ease-in-out pt-[70px]"
                                style={{ transform: `translateX(${position}px)` }}
                            >
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="min-w-[298px] bg-white rounded-2xl pt-0 px-[18px] pb-[18px] shadow-[0px_8px_30px_rgba(0,0,0,0.08)] flex flex-col"
                                    >
                                        {/* Image overflowing top */}
                                        <img
                                            src={
                                                job.image
                                                    ? `${import.meta.env.VITE_API_URL}storage/${job.image}`
                                                    : "/preview_img_slider.webp"
                                            }
                                            alt={job.title?.[lang] ?? job.title}
                                            className="w-full h-[180px] object-cover rounded-xl -mt-[70px] mb-4 shadow-md"
                                        />

                                        {/* Job Title */}
                                        <h3 className="m-0 mb-3 font-['Roboto'] font-bold text-[20px] leading-snug text-[#2A69C6] min-h-[48px] flex items-start">
                                            {job.title?.[lang] ?? job.title}
                                        </h3>

                                        {/* Job Details */}
                                        <div className="space-y-[6px] font-['Roboto'] text-[15px] text-[#444] flex-1">
                                            {job.education && (
                                                <p className="m-0">
                                                    <span className="font-bold text-[#222]">Education: </span>
                                                    {typeof job.education === 'object' ? job.education[lang] : job.education}
                                                </p>
                                            )}
                                            {job.experience && (
                                                <p className="m-0">
                                                    <span className="font-bold text-[#222]">Experience: </span>
                                                    {typeof job.experience === 'object' ? job.experience[lang] : job.experience}
                                                </p>
                                            )}
                                            {job.location && (
                                                <p className="m-0">
                                                    <span className="font-bold text-[#222]">Location: </span>
                                                    {typeof job.location === 'object' ? job.location[lang] : job.location}
                                                </p>
                                            )}
                                            {job.deadline && (
                                                <p className="m-0">
                                                    <span className="font-bold text-[#222]">Deadline: </span>
                                                    {job.deadline}
                                                </p>
                                            )}
                                        </div>

                                        {/* Browse Button */}
                                        <Link to={`/jobs/${job.id}`} className="no-underline mt-4">
                                            <button className="font-['Roboto'] font-medium text-[16px] py-[10px] border border-[#2196F3] w-full rounded-[10px] bg-transparent text-[#0D47A1] hover:bg-[#2196F3] hover:text-white transition-all duration-200 cursor-pointer">
                                                Browse Job
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons — bottom right */}
                        <div className="absolute bottom-[20px] right-4 flex gap-[16px]">
                            <button
                                onClick={() => scroll('prev')}
                                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center border-none cursor-pointer hover:bg-[#f0f0f0] transition-all"
                                aria-label="Previous"
                            >
                                <img src="/Vector (3).svg" alt="Previous" className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scroll('next')}
                                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center border-none cursor-pointer hover:bg-[#f0f0f0] transition-all"
                                aria-label="Next"
                            >
                                <img src="/Vector (4).svg" alt="Next" className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Decoration Image (~23%) */}
                    <div className="hidden lg:flex lg:w-[23%] items-center justify-center">
                        <img
                            src="/preview_img.webp"
                            alt="Decoration"
                            className="w-full object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default JobPreviewSection;
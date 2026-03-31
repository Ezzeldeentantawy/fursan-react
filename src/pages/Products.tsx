import React from 'react';

// Reusable Card Component for Products
const ProductCard = ({ title, subtitle, items, buttonText, isPrimary, isManaged }) => (
    <div className={`flex flex-col justify-between rounded-[34px] px-[25px] py-[80px] transition-all 
    ${isManaged ? 'bg-[#EEF6FC] shadow-none' : 'bg-white shadow-[10px_10px_25px_10px_rgba(0,0,0,0.05)]'}`}>
        <div>
            <h3 className={`text-[29px] leading-[33px] font-extrabold text-center capitalize text-[#2A69C6] mb-[30px] ${isManaged ? 'min-h-[66px]' : ''}`}>
                {title}
            </h3>
            <h4 className="text-2xl leading-[33px] font-bold text-center capitalize text-black/85 mb-[50px]">
                {subtitle}
            </h4>
            <ul className="min-h-[200px] mb-8 list-none p-0">
                {items.map((item, idx) => (
                    <li key={idx} className="text-xl font-bold text-center capitalize text-[#757575] mb-5 last:mb-0">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
        <a
            href="#"
            className={`block text-center py-[15px] px-[50px] rounded-[10px] text-xl font-medium capitalize transition-colors
        ${isPrimary
                    ? 'bg-[#2A69C6] text-white hover:bg-[#1e4e96]'
                    : 'bg-transparent border border-[#2A69C6] text-[#2A69C6] hover:bg-[#2A69C6] hover:text-white'}`}
        >
            {buttonText}
        </a>
    </div>
);

const Products = () => {
    const selfManagedTools = [
        {
            title: "Fursan ATS",
            subtitle: "All-in-one system to manage your full recruitment process.",
            items: ["Post & manage jobs", "Track candidates", "Schedule interviews", "Collaborate with teams", "Recruitment analytics"],
            buttonText: "Request Demo",
            isPrimary: true
        },
        {
            title: "Recruitment Marketplace",
            subtitle: "Publish jobs and connect directly with active job seekers.",
            items: ["Job posting", "Receive applications", "Employer profile", "Candidate discovery"],
            buttonText: "Post A Job",
            isPrimary: false
        },
        {
            title: "Talent Database",
            subtitle: "Search and filter candidates proactively.",
            items: ["Advanced filters", "Skill-based search", "Direct contact"],
            buttonText: "Access Database",
            isPrimary: false
        }
    ];

    const managedSolutions = [
        {
            title: "Recruitment Outsourcing (RPO)",
            subtitle: "We manage your recruitment process end-to-end.",
            items: ["Sourcing", "Screening", "Interviews", "Offer management"],
            buttonText: "Book Consultation",
            isPrimary: true
        },
        {
            title: "Team Outsourcing",
            subtitle: "Build dedicated teams without internal HR overhead.",
            items: ["Tech teams", "Sales teams", "Support teams", "Remote teams"],
            buttonText: "Build a Team",
            isPrimary: false
        },
        {
            title: "Employer of Record (EOR)",
            subtitle: "Hire internationally without opening a legal entity.",
            items: ["Legal employment", "Payroll", "Contracts", "Compliance"],
            buttonText: "Hire Globally",
            isPrimary: false
        }
    ];

    return (
        <div className="bg-white font-['Roboto'] overflow-x-hidden">

            {/* 1. Hero Products Section */}
            <section className="relative py-[200px] px-4 before:content-[''] before:absolute before:right-0 before:top-0 before:w-1/2 before:h-full before:bg-[url('/Artwork.webp')] before:bg-cover before:bg-no-repeat before:z-0">
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h2 className="text-[40px] leading-[45px] font-bold capitalize text-black">
                        Our <span className="text-[#0D47A1]">Products</span>
                    </h2>
                    <p className="text-2xl leading-[139%] font-medium text-black/50 mt-4 max-w-2xl mx-auto">
                        Flexible hiring solutions — from self-managed recruitment tools to fully outsourced workforce services.
                    </p>
                </div>
            </section>

            {/* 2. Self-Managed Hiring Tools */}
            <section className="bg-[#E8F4FE] py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[31px] leading-[42px] font-bold text-center text-[#2A69C6]">
                        Self-Managed Hiring Tools
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[60px]">
                        {selfManagedTools.map((tool, i) => (
                            <ProductCard key={i} {...tool} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Managed Hiring & Workforce Solutions */}
            <section className="py-16 px-4 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[31px] leading-[42px] font-bold text-center text-[#2A69C6]">
                        Managed Hiring & Workforce Solutions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[60px]">
                        {managedSolutions.map((solution, i) => (
                            <ProductCard key={i} {...solution} isManaged={true} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Product CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto bg-[#2A69C6] rounded-[21px] p-8 md:p-[50px] text-center">
                    <h2 className="text-4xl font-bold text-white mb-10">
                        Not Sure Which Solution Fits You?
                    </h2>
                    <p className="text-2xl font-medium text-white mb-10 leading-none">
                        Choose the right solution and start hiring smarter today.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-[#2A69C6] border border-[#2A69C6] shadow-[0px_3px_24px_4px_rgba(0,0,0,0.06)] px-[113px] py-[18px] rounded-lg font-extrabold text-base uppercase transition-transform hover:scale-105"
                    >
                        Talk to Our Team
                    </a>
                </div>
            </section>

        </div>
    );
};

export default Products;
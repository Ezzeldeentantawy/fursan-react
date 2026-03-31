import React from 'react'

const OurServices = () => {
    return (
        <div className="bg-white font-['Roboto']">

            {/* 1. Hero Services Section */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-[40px] leading-[45px] font-bold capitalize text-black mb-[15px]">
                        Smart Recruitment Solutions for <span className="text-[#0D47A1]">Growing Companies</span>
                    </h2>
                    <p className="text-2xl leading-[139%] text-black/50 max-w-[914px] mx-auto">
                        From AI-powered hiring tools to full recruitment outsourcing and global team building,
                        Fursan helps you hire faster, smarter, and fully compliant.
                    </p>
                </div>
            </section>

            {/* 2. AI Powered Section */}
            <section className="py-8 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-[31px] leading-[42px] font-bold text-[#2A69C6] mb-[15px]">
                                AI-Powered Recruitment Platform
                            </h3>
                            <p className="text-xl font-bold text-black/55 mb-0">
                                Manage your entire hiring process from one intelligent dashboard designed to streamline sourcing, screening, interviews, and onboarding.
                            </p>
                            <ul className="pl-14 my-[30px] space-y-[30px]">
                                {[
                                    "Smart CV screening & AI matching",
                                    "Centralized ATS dashboard",
                                    "Automated interview scheduling",
                                    "Structured evaluations & scorecards",
                                    "Talent pool management",
                                    "Built-in employee referral program"
                                ].map((item, index) => (
                                    <li key={index} className="relative text-xl font-bold text-black/55 pl-2 before:content-[''] before:absolute before:left-[-25px] before:top-1 before:w-5 before:h-5 before:bg-[url('/check_mark.svg')] before:bg-cover">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="block text-center border border-[#2A69C6] text-[#2A69C6] py-[25px] font-bold text-[19px] uppercase rounded-[14px] hover:bg-[#2A69C6] hover:text-white transition-colors">
                                Request a Demo
                            </a>
                        </div>
                        <div className="w-full md:w-1/2 text-right mt-10 md:mt-0">
                            <img src="/AI Powered.webp" alt="AI Powered" className="w-full max-w-[545px] inline-block" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Divider Image */}
            <div className="w-full">
                <img src="/Rectangle.webp" alt="Divider" className="w-full" />
            </div>

            {/* 4. Global Hiring Section */}
            <section className="bg-[#E8F4FE] py-24 -mt-[5px] px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-[31px] leading-[42px] font-bold text-[#2A69C6]">
                        Recruitment Outsourcing & Global Hiring
                    </h3>
                    <p className="text-xl font-bold text-black/55 mt-[15px]">
                        Let Fursan manage the full recruitment lifecycle while you focus on growth and strategy.
                    </p>

                    <div className="flex flex-wrap md:flex-nowrap gap-5 mt-[60px] text-left">
                        {[
                            {
                                title: "Full Recruitment Management",
                                items: ["End-to-end hiring process", "Sourcing to onboarding"]
                            },
                            {
                                title: "Remote & Global Teams",
                                items: ["Hire in Jordan, Gulf & US", "Remote & hybrid teams"]
                            },
                            {
                                title: "Employer of Record (EOR)",
                                items: ["Legal compliance", "Payroll & contracts handled"]
                            }
                        ].map((box, i) => (
                            <div key={i} className="bg-white rounded-[34px] p-[30px] flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[25px] leading-[48px] font-bold capitalize text-[#2A69C6]">{box.title}</h4>
                                    <ul className="mt-[30px] space-y-[40px]">
                                        {box.items.map((li, j) => (
                                            <li key={j} className="text-xl font-bold capitalize text-[#757575]">{li}</li>
                                        ))}
                                    </ul>
                                </div>
                                <a href="#" className="mt-8 block bg-[#2A69C6] text-white rounded-[10px] text-xl font-medium leading-[48px] text-center capitalize">
                                    Book a Consultation
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Data Driven Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-[40%] lg:mt-[100px]">
                        <img src="/Connected. Scalable. Data-Driven..webp" alt="Data Driven" className="w-full" />
                    </div>
                    <div className="w-full lg:w-[60%] lg:pl-[50px] mt-10 lg:mt-0">
                        <h3 className="text-[31px] leading-[42px] font-bold text-[#2A69C6] mb-[15px]">Connected. Scalable. Data-Driven.</h3>
                        <p className="text-xl font-bold text-black/55">Seamless integrations and real-time analytics to optimize every hiring decision.</p>

                        <div className="flex flex-wrap row-gap-[30px] mt-[70px]">
                            {[
                                { title: "Find the Right Talent", desc: "Access pre-screened Jordanian professionals across technology, engineering, finance, human resources, and operations.", img: "Rectangle.svg" },
                                { title: "Build Stronger Companies", desc: "Our scalable recruitment and HR solutions support long-term business growth and workforce stability.", img: "Rectangle (1).svg" },
                                { title: "Save While Growing", desc: "Hiring in Jordan allows organizations to optimize costs without compromising on talent quality.", img: "Rectangle (2).svg" },
                                { title: "Quick Apply", desc: "Job seekers can apply easily, track applications, and connect with top employers.", img: "Rectangle (3).svg" }
                            ].map((item, i) => (
                                <div key={i} className="w-full md:w-1/2 pr-4 mb-8">
                                    <img src={`/${item.img}`} alt="icon" className="max-w-[44px] mb-4" />
                                    <h4 className="text-[26px] leading-[42px] font-medium text-black/85">{item.title}</h4>
                                    <p className="text-base text-black/85 leading-6 font-normal">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Career Section */}
            <section className="bg-[#2A69C6] m-[10px] rounded-[12px] py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-4xl font-bold text-white mb-[25px]">Build Your Career with Fursan</h3>
                    <p className="text-2xl font-medium text-white">Create your account to explore curated opportunities across Jordan, the Gulf, and the US.</p>

                    <ul className="my-10 mb-14 mx-auto w-fit text-left">
                        {[
                            "Personalized job recommendations",
                            "Smart job alerts",
                            "Application tracking dashboard",
                            "Direct access to leading employers"
                        ].map((item, i) => (
                            <li key={i} className="relative text-xl text-white mb-5 pl-2 before:content-[''] before:absolute before:left-[-25px] before:top-1 before:w-5 before:h-5 before:bg-[url('/white_check_mark.svg')] before:bg-cover">
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap justify-center gap-5 mt-20">
                        <a href="#" className="bg-white text-[#2A69C6] border border-[#2A69C6] shadow-[0px_3px_24px_4px_#0000000F] rounded-lg px-20 py-[18px] font-extrabold text-base uppercase whitespace-nowrap">
                            Create Your Account
                        </a>
                        <a href="#" className="bg-transparent text-white border border-white shadow-[0px_3px_24px_4px_#0000000F] rounded-lg px-28 py-[18px] font-extrabold text-base uppercase whitespace-nowrap">
                            Browse Jobs
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default OurServices;
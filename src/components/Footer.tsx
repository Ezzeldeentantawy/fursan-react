import React from 'react';
import {
    Globe,
    ChevronDown,
} from 'lucide-react';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // The new X logo



const Footer = () => {
    const footerSections = [
        {
            title: "OUR SERVICES",
            links: ["Recruitment Setup", "Recruitment Workflows & Procedures", "Outsourcing & Team Building", "Employer of Record (EOR) Solutions", "Payroll & HR Compliance"]
        },
        {
            title: "PRODUCTS",
            links: ["Applicant Tracking System (ATS)", "AI Recruitment Tools", "Platform Integrations & Analytics"]
        },
        {
            title: "RESOURCES",
            links: ["Guides & eBooks", "Blog & Insights", "Webinars & Events", "FAQ / Help Center", "Case Studies / Customer Stories"]
        },
        {
            title: "COMPANY / ABOUT",
            links: ["Our Vision", "Company Overview / Mission", "Careers", "Contact Us"]
        }
    ];

    return (
        /* Changed font-alexandria to font-['Roboto'] */
        <footer className="relative bg-[#F8FBFF] pt-20 pb-10 font-['Roboto'] overflow-hidden">

            {/* Decorative Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute -left-20 top-10 w-64 h-64 bg-blue-100 rotate-45 rounded-[40px]" />
                <div className="absolute -right-20 bottom-20 w-96 h-96 bg-blue-50 rotate-45 rounded-[60px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

                    {/* Brand and Contact Column */}
                    <div className="lg:col-span-1 self-center">
                        <img src="/logo.png" alt="Fursan Logo" className="h-[56px] w-auto mb-6" />
                        <div className="space-y-2 text-[15px] text-gray-600 leading-relaxed">
                            <p><span className="font-bold text-gray-800">Phone:</span> +962799854608</p>
                            <p><span className="font-bold text-gray-800">Email:</span> superadmin@fursan.com</p>
                            <p><span className="font-bold text-gray-800">Address:</span> Amman – Jordan</p>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            {/* Roboto looks great with font-bold (700) or font-black (900) */}
                            <h3 className="text-[#0D47A1] font-[700] text-[18px] mb-8 tracking-wider uppercase">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-500 hover:text-[#0D47A1] transition-colors text-[16px] leading-snug block font-normal">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Language Selector Column */}
                    <div className="lg:col-span-1">
                        <div className="relative inline-block w-full">
                            <div className="flex items-center justify-between border-2 border-[#0D47A1]/30 rounded-lg px-4 py-2 bg-white cursor-pointer group hover:border-[#0D47A1] transition-all">
                                <div className="flex items-center gap-2">
                                    <Globe className="text-[#0D47A1]" size={20} />
                                    <span className="text-gray-800 font-medium text-[14px]">English - En</span>
                                </div>
                                <ChevronDown className="text-gray-400 group-hover:text-[#0D47A1]" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#2A69C6] font-[400] text-[18px]">
                        Copyright © 2026 Fursan. All Rights Reserved
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-[#2A69C6] font-[400] text-[18px]">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Terms & Conditions</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Data Protection & Security</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <SocialIcon icon={<FaFacebookF size={25} strokeWidth={2.5} />} />
                        <SocialIcon icon={<FaLinkedin size={25} strokeWidth={2.5} />} />
                        <SocialIcon icon={<FaXTwitter size={25} strokeWidth={2.5} />} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-[40px] h-[40px] rounded-full bg-blue-50 flex items-center justify-center text-[#2A69C6] hover:bg-[#0D47A1] hover:text-white transition-all shadow-sm">
        {icon}
    </a>
);

export default Footer;
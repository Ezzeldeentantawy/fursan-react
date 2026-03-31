import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const navLinks = [
        { name: 'Our Services', href: '/services' },
        { name: 'Products', href: '/products' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Resources', href: '/resources' },
        { name: 'About us', href: '/about', hasDropdown: true },
        { name: 'Jobs', href: '/jobs' },
        { name: 'Contact us', href: '/contact' },
    ];

    return (
        /* 1. bg-white/70 (transparent white)
           2. backdrop-blur-md (the blur effect)
           3. sticky top-0 (keeps it at the top as you scroll)
        */
        <nav className="bg-white/70 backdrop-blur-md border-b border-gray-100 font-alexandria sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Section */}
                    <div 
                    onClick={() => navigate('/')}
                    className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <img
                            src="/logo.png"
                            alt="Fursan Logo"
                            className="h-[72px] w-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Language Switcher */}
                        <button className="flex items-center gap-1 text-[#0D47A1] font-[800] text-lg hover:opacity-80 transition-opacity">
                            EN <ChevronDown size={18} strokeWidth={3} />
                        </button>

                        {/* Links */}
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to  ={link.href}
                                    className="font-[500] text-[17px] tracking-tight hover:text-[#0D47A1] transition-colors flex items-center gap-1 text-black"
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={16} className="mt-0.5" />}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link       
                        to="/login"
                        className="hidden lg:flex justify-center items-center border-2 border-[#0D47A1] text-[#0D47A1] font-[600] text-[16px] rounded-2xl hover:bg-[#0D47A1] hover:text-white transition-all text-center w-[152px] h-[54px]"
                    >
                        Log In
                    </Link>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-black focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Also added blur here */}
            {isOpen && (
                <div className="lg:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
                    <button className="w-full flex items-center px-3 gap-1 text-[#0D47A1] font-bold text-lg py-2 mb-4">
                        EN <ChevronDown size={18} />
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="block px-3 py-3 text-lg font-medium text-gray-700 hover:bg-blue-50/50 hover:text-[#0D47A1] rounded-lg"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-100">
                        <Link
                            to="/login"
                            className="block w-full text-center px-6 py-3 border-2 border-[#0D47A1] text-[#0D47A1] font-bold text-lg rounded-2xl"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
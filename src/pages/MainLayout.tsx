import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar'; // Your Alexandria Navbar component
import Footer from '../components/Footer'; // Your Alexandria Footer component

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-alexandria antialiased">
            {/* The Navbar stays fixed at the top */}
                <Navbar />

            {/* This main tag holds the unique content for each page */}
            <main className="flex-grow">
                {/* The <Outlet /> is where the specific page components will render */}
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
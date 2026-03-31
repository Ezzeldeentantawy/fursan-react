// src/layouts/EmployerLayout.jsx
import { Outlet } from "react-router-dom";
import EmployerSidebar from "../../components/Employer/EmployerSidebar";

const EmployerLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar stays fixed on the left */}
            <EmployerSidebar />

            {/* Main content area scrolls independently */}
            <main className="flex-1 h-screen overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default EmployerLayout;
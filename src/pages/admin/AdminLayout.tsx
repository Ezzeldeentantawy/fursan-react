// src/layouts/EmployerLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const EmployerLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar stays fixed on the left */}
            <AdminSidebar />

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
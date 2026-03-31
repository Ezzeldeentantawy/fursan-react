import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    Briefcase,
    Users,
    LogOut,
    ChevronRight
} from "lucide-react";

const EmployerSidebar = () => {
    const navItemClass = ({ isActive }) =>
        `flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all duration-200 group ${isActive
            ? "bg-[#2A69C6] text-white shadow-lg shadow-blue-100"
            : "text-gray-500 hover:bg-blue-50 hover:text-[#2A69C6]"
        }`;

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
            {/* Branding */}
            <div className="p-8 mb-4">
                <img src="/logo.png" alt="Logo" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <NavLink to="/employer/" className={navItemClass}>
                    <div className="flex items-center gap-3">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </div>
                </NavLink>

                <NavLink to="/employer/create-job" className={navItemClass}>
                    <div className="flex items-center gap-3">
                        <PlusCircle size={20} />
                        <span>Create New Job</span>
                    </div>
                </NavLink>

                <NavLink to="/employer/jobs" className={navItemClass}>
                    <div className="flex items-center gap-3">
                        <Briefcase size={20} />
                        <span>My Listed Jobs</span>
                    </div>
                </NavLink>

                <NavLink to="/employer/applications" className={navItemClass}>
                    <div className="flex items-center gap-3">
                        <Users size={20} />
                        <span>Applications</span>
                    </div>
                    <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </NavLink>
            </nav>

            {/* Logout */}
            {/* <div className="p-6 border-t border-gray-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-all active:scale-95">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div> */}
        </aside>
    );
};

export default EmployerSidebar;
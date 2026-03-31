import { NavLink } from "react-router-dom";
import {
    ShieldCheck,
    Users,
    Globe,
    BookOpenCheck,
    FolderClock,
    Trash,
    List,
    Settings,
    LogOut,
    Database,
    Search
} from "lucide-react";

const AdminSidebar = () => {
    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-200 ${isActive
            ? "bg-slate-900 text-white shadow-lg shadow-slate-300"
            : "text-gray-500 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
            {/* Admin Branding */}
            <div className="p-8 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                        <ShieldCheck size={22} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">Admin OS</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <NavLink to="/admin/" className={navItemClass}>
                    <Database size={20} />
                    <span>Platform Stats</span>
                </NavLink>


                <NavLink to="/admin/all-jobs" className={navItemClass}>
                    <List size={20} />
                    <span>All Jobs</span>
                </NavLink>

                <NavLink to="/admin/approved-jobs" className={navItemClass}>
                    <BookOpenCheck size={20} />
                    <span>Approved Jobs</span>
                </NavLink>

                <NavLink to="/admin/pending-jobs" className={navItemClass}>
                    <FolderClock size={20} />
                    <span>Pending Jobs</span>
                </NavLink>

                <NavLink to="/admin/deleted-jobs" className={navItemClass}>
                    <Trash size={20} />
                    <span>Deleted Jobs</span>
                </NavLink>


                <NavLink to="/admin/settings" className={navItemClass}>
                    <Settings size={20} />
                    <span>Site Settings</span>
                </NavLink>
            </nav>

            {/* Logout */}
            {/* <div className="p-6 border-t border-gray-50">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 font-semibold rounded-2xl hover:bg-gray-50 hover:text-red-600 transition-all">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div> */}
        </aside>
    );
};

export default AdminSidebar;
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { 
  Users, 
  Briefcase, 
  Clock, 
  Trash2, 
  Activity,
  AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: 0,
    pendingJobs: 0,
    deletedJobs: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Jobs and Users in parallel for speed
        const [jobsRes, usersRes] = await Promise.all([
          api.get('/api/admin/jobs'),
          api.get('/api/admin/users').catch(() => ({ data: { total: 0 } })) // Fallback if no user route yet
        ]);

        const allJobs = Array.isArray(jobsRes.data.data) ? jobsRes.data.data : jobsRes.data.jobs || [];
        const userCount = usersRes.data.total || usersRes.data.length || 0;

        // 2. Calculate dynamic stats from the jobs array
        setStats({
          totalUsers: userCount,
          activeJobs: allJobs.filter(j => j.status === 'approved').length,
          pendingJobs: allJobs.filter(j => j.status === 'pending').length,
          deletedJobs: allJobs.filter(j => j.status === 'deleted' || j.deleted_at).length,
        });

        // 3. Get the 5 most recent jobs for the activity feed
        const sortedJobs = [...allJobs]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        
        setRecentJobs(sortedJobs);

      } catch (err) {
        setError("Failed to sync dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">
            {loading ? "..." : value}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${color} text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-10 flex flex-col items-center text-red-500">
      <AlertCircle size={48} className="mb-4" />
      <p className="font-bold">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 underline">Retry</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900">System Pulse</h1>
        <p className="text-slate-500 italic">Real-time platform metrics and audit overview.</p>
      </header>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Talents" value={stats.totalUsers} icon={Users} color="bg-indigo-600" />
        <StatCard title="Live Postings" value={stats.activeJobs} icon={Briefcase} color="bg-[#2A69C6]" />
        <StatCard title="Awaiting Review" value={stats.pendingJobs} icon={Clock} color="bg-orange-500" />
        <StatCard title="Trash Bin" value={stats.deletedJobs} icon={Trash2} color="bg-rose-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Dynamic Activity Feed */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[#2A69C6]" />
            Recent Job Submissions
          </h2>
          
          <div className="space-y-6">
            {recentJobs.length > 0 ? recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between group">
                <div className="flex gap-4 items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${job.status === 'pending' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium group-hover:text-[#2A69C6] transition-colors">
                      {job.title['en']} <span className="text-gray-400 font-normal">at</span> {job.employer?.name}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(job.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${job.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {job.status}
                </span>
              </div>
            )) : (
              <p className="text-gray-400 italic">No recent activity detected.</p>
            )}
          </div>
        </div>

        {/* System Health / Quick Links */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[32px] text-white">
            <h3 className="font-bold text-lg mb-4">Security Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Database Status</span>
                <span className="text-emerald-400 font-bold">Online</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Storage Usage</span>
                <span className="text-white font-bold">12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
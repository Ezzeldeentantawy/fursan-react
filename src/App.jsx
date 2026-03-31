import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Register from './pages/register';
import Login from './pages/login';
import AdminGuard from './components/AdminGuard';
import AdminDashboard from './pages/admin/dashboard';
import CreateEmployerAcc from './pages/admin/createEmployerAcc';
import PendingJobs from './pages/admin/PendingJobs';
import EmployerGuard from './components/EmployerGuard';
import EmployerDashboard from './pages/Employer/Dashboard';
import CreateJob from './pages/Employer/createJob';
import Jobs from './pages/Employer/Jobs';
import DeletedJobs from './pages/admin/DeletedJobs';
import JobList from './pages/JobListing';
import Profile from './pages/Profile';
import JobApplications from './pages/Employer/JobApplications';
import JobApplicationsDetail from './pages/Employer/applications/[id]/page';
import EmployerLayout from './pages/Employer/EmployerLayout';
import AdminLayout from './pages/admin/AdminLayout';
import AllJobs from './pages/admin/AllJobs';
import ApprovedJobs from './pages/admin/ApprovedJobs';
import NotFound from './pages/NotFound';
import CandidateApps from './pages/CandidateApps';
import OurServices from './pages/OurServices';
import Products from './pages/Products';
import Navbar from './components/NavBar';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="jobs" element={<JobList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-applications" element={<CandidateApps />} />
            <Route path="services" element={<OurServices />} />
            <Route path="products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Protect admin routes */}
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="create-employer" element={<CreateEmployerAcc />} />
              <Route path="all-jobs" element={<AllJobs />} />
              <Route path="approved-jobs" element={<ApprovedJobs />} />
              <Route path="pending-jobs" element={<PendingJobs />} />
              <Route path="deleted-jobs" element={<DeletedJobs />} />
            </Route>
          </Route>
          {/* Protect employer routes */}
          <Route element={<EmployerGuard />}>
            <Route path="/employer" element={<EmployerLayout />}>
              <Route index element={<EmployerDashboard />} />
              <Route path="create-job" element={<CreateJob />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="applications" element={<JobApplications />} />
              <Route path="applications/:id" element={<JobApplicationsDetail />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;

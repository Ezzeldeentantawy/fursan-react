import { useState } from "react";
import { useAuth } from "../components/isLoggedIn";
import { useNavigate } from "react-router-dom"; // Recommended for navigation
import CTASection from "../components/CTASection";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    // 1. Handle the "Already Logged In" state
    if (user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white px-4">
                <div className="max-w-md w-full bg-[#E8F4FE] border border-[#2A69C6]/20 rounded-[30px] p-10 text-center shadow-lg">
                    <div className="w-20 h-20 bg-[#2A69C6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <span className="text-white text-3xl font-bold font-['Roboto']">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <h2 className="font-['Roboto'] font-bold text-2xl text-[#0D47A1] mb-2">
                        Welcome Back!
                    </h2>

                    <p className="font-['Roboto'] text-lg text-black/70 mb-8">
                        You are already logged in as <span className="font-semibold text-[#2A69C6]">{user.name}</span>.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#2A69C6] text-white py-3 rounded-xl font-['Roboto'] font-medium transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                        >
                            Go to Home page
                        </button>

                        <button
                            onClick={logout}
                            className="w-full bg-transparent border border-[#2A69C6] text-[#2A69C6] py-3 rounded-xl font-['Roboto'] font-medium hover:bg-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Handle the Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLocalError(null);

        try {
            // We pass the credentials object to the login function in useAuth
            await login({ email, password });
            
            // If successful, navigate to dashboard or home
            navigate('/'); 
        } catch (err: any) {
            // The error is already handled in the provider, 
            // but we catch it here to stop the 'loading' state
            setLocalError(err.message || "Invalid credentials");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="py-[6em] w-full">
                <div className="container mx-auto flex items-center mt-[150px] px-4 max-w-[1300px]">

                    <div className="relative w-1/2 bg-[#BBDEFB5C] rounded-[47px] p-[60px_40px] max-w-[524px] ml-[50px]">
                        
                        <h3 className="font-['Roboto'] font-medium text-[35px] leading-[42px] capitalize text-[#000000DE] mb-5">
                            Login
                        </h3>

                        {/* 3. Display Errors to the user */}
                        {localError && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {localError}
                            </div>
                        )}

                        <form className="flex flex-col gap-[15px] login-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="block w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer bg-[#2A69C6] font-['Roboto'] font-medium text-[20px] capitalize text-white p-[12px_10px] rounded-[10px] mb-[30px] transition-all hover:bg-[#1e4b8f] disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="text-center">
                            {/* <a href="#" className="block font-['Roboto'] font-normal text-[18px] uppercase text-[#2A69C6] no-underline mb-4">
                                forget password ?
                            </a> */}

                            <p className="font-['Roboto'] font-normal text-[18px] capitalize text-[#000000DE]">
                                dont have an account ?{' '}
                                <a href="/register" className="inline text-[#2A69C6] uppercase font-bold">sign up</a>
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 text-right">
                        <img
                            src="/login_img.webp"
                            alt="Login Illustration"
                            className="w-full max-w-[524px] inline-block"
                        />
                    </div>
                </div>
            </section>
            <CTASection />
        </>
    );
}

export default Login;
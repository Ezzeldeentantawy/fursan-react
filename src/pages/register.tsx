import { useState } from "react";
import { useAuth } from "../components/isLoggedIn"; // Adjust path as needed
import { useNavigate, Link } from "react-router-dom"; // Use Link for internal routing
import CTASection from "../components/CTASection";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const { user, register, logout } = useAuth();
    const navigate = useNavigate();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setLocalError("Passwords do not match!");
            return;
        }

        setIsSubmitting(true);
        setLocalError(null);

        try {
            await register({
                name,
                email,
                password,
                password_confirmation: confirmPassword
            });
            navigate('/'); // Redirect after successful signup
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="relative py-24 overflow-hidden bg-white">
                <div className="max-w-[1300px] mx-auto px-4 mt-[150px] flex flex-wrap items-center">
                    <div className="w-full lg:w-1/2 relative z-10">
                        <div className="bg-[#BBDEFB5C] rounded-[47px] p-[60px_40px] max-w-[524px] ml-0 lg:ml-[50px]">
                            <h3 className="font-['Roboto'] font-medium text-[35px] mb-5">Register</h3>

                            {localError && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                                    {localError}
                                </div>
                            )}

                            <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-[#2A69C6] p-[12px_10px] rounded-[10px] bg-transparent focus:outline-none disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#2A69C6] p-[12px_10px] rounded-[10px] text-white font-medium transition-all hover:bg-[#1e4b8f] disabled:bg-gray-400 mt-4"
                                >
                                    {isSubmitting ? "Creating Account..." : "Register"}
                                </button>
                            </form>

                            <p className="text-center mt-[15px]">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#2A69C6] font-bold hover:underline">LOGIN</Link>
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-right mt-12 lg:mt-0">
                        <img src="/Signup.webp" alt="Sign up" className="w-full max-w-[524px] inline-block" />
                    </div>
                </div>
            </section>
            <CTASection />
        </>
    );
}

export default Register;
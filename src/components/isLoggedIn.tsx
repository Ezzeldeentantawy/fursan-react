import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
    ReactNode
} from "react";
import axios from "axios";
import api from "../api/axios";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: any) => Promise<void>; // Changed to handle the logic
    logout: () => Promise<void>;
    register: (formData: any) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get<User>(`/api/user`);
            setUser(res.data);
            setError(null);
        } catch (err: any) {
            setUser(null);
            if (err.response?.status !== 401) {
                setError("Session expired or server error");
            }
        } finally {
            setLoading(false);
        }
    }, []);


    const login = async (credentials: any) => {
        try {
            await api.get('/sanctum/csrf-cookie');
            const res = await api.post('/api/auth/login', credentials);
            setUser(res.data.user);
            setError(null);
        } catch (err: any) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            throw new Error(message); // Re-throw so the component can handle UI state
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout"); // Use 'api', not 'axios'
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            // Always clear user state even if request fails
            setUser(null);
        }
    };

    const register = async (formData: any) => {
        try {
            await api.get('/sanctum/csrf-cookie');
            // Your specific endpoint: /api/auth/register/candidate
            const res = await api.post('/api/auth/register/candidate', formData);

            // Laravel Sanctum usually logs the user in automatically after registration
            // If your API returns the user object, set it here:
            setUser(res.data.user);
            setError(null);
        } catch (err: any) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            throw new Error(message);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = useMemo(() => ({
        user,
        loading,
        error,
        login,
        logout,
        register,
        refreshUser: checkAuth
    }), [user, loading, error, checkAuth]);

    return (
        <AuthContext.Provider value={value}>
            {/* Prevent flickering: Don't show app until we know auth status */}
            {!loading ? children : <div className="loading-spinner">Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
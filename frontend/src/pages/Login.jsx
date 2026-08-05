import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md rounded-3xl border border-pink-500/20 bg-black/70 p-8 shadow-2xl">
                <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-400 mb-8">Sign in to continue your music journey.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-xl border border-pink-500/30 bg-zinc-900 px-4 py-3 outline-none"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded-xl border border-pink-500/30 bg-zinc-900 px-4 py-3 outline-none"
                        required
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-pink-600 py-3 font-semibold hover:bg-pink-500 disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Log In"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400">
                    New here? <Link to="/register" className="text-cyan-400">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(username, email, password);
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-black/70 p-8 shadow-2xl">
                <h1 className="text-4xl font-bold mb-2">Create your account</h1>
                <p className="text-gray-400 mb-8">Join DevilBeats and build your perfect soundtrack.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full rounded-xl border border-cyan-500/30 bg-zinc-900 px-4 py-3 outline-none"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-xl border border-cyan-500/30 bg-zinc-900 px-4 py-3 outline-none"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded-xl border border-cyan-500/30 bg-zinc-900 px-4 py-3 outline-none"
                        required
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-cyan-600 py-3 font-semibold hover:bg-cyan-500 disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-pink-400">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
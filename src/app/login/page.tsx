"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validate = () => {
        let valid = true;
        const newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log({ email, password });
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-customGreen px-4 py-2 text-white transition-colors hover:bg-green-400"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}

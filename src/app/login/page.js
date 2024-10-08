import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-neutral text-primary-content">
            <div className="bg-base-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                
                {/* Login Form */}
                <form>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Log In
                    </button>
                </form>
                
                {/* Signup Link */}
                <p className="mt-6 text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="link link-primary">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

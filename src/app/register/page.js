import React from 'react';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-neutral text-primary-content">
            <div className="bg-base-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                
                {/* Register Form */}
                <form>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Sign Up
                    </button>
                </form>
                
                {/* Login Link */}
                <p className="mt-6 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="link link-primary">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

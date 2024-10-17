'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showAlert = (message) => {
        alert(message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isCreatingAccount) {
            // Account creation logic
            if (
                password === "" ||
                confrmPassword === "" ||
                email === "" ||
                username === ""
            ) {
                showAlert("Please fill in all fields");
                setLoading(false);
                return;
            } else if (password !== confrmPassword) {
                showAlert("Passwords do not match");
                setLoading(false);
                return;
            } else if (!emailRegex.test(email)) {
                showAlert("Please enter a valid email address");
                setLoading(false);
                return;
            } else {
                try {
                    const res = await fetch("/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password, email }),
                    });

                    if (!res.ok) {
                        showAlert("Failed to create account");
                    } else {
                        showAlert("Account created successfully!");
                    }
                } catch (error) {
                    showAlert("An error occurred");
                }
                setLoading(false);
            }
        } else {
            // Handle login logic
            if (email === "" || password === "") {
                showAlert("Please fill in all fields");
                setLoading(false);
                return;
            }
        
            try {
                const res = await fetch("/api/authenticate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
        
                const data = await res.json();
        
                if (res.ok && data?.token) {
                    // Store JWT token in localStorage
                    localStorage.setItem("token", data.token);
        
                    // Redirect to dashboard or desired page
                    showAlert("Login successful!");
                    window.location.href = "/watchlist"; 
                } else {
                    showAlert(data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                showAlert("An error occurred. Please try again later.");
            }
        
            setLoading(false);
        }
        
    };

    return (
        <div className="flex items-center justify-center h-screen bg-neutral text-primary-content">
            <div className="bg-base-100 p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-3xl font-bold text-center mb-6">
                    {isCreatingAccount ? "Create Account" : "Login"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {isCreatingAccount && (
                        <>
                            {/* Username Field */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm" htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="input input-bordered w-full bg-base-200 text-primary-content"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input input-bordered w-full bg-base-200 text-primary-content"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    {isCreatingAccount && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm" htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    className="input input-bordered w-full bg-base-200 text-primary-content"
                                    placeholder="Confirm your password"
                                    value={confrmPassword}
                                    onChange={(e) => setConfrmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                    >
                        {isCreatingAccount ? "Create Account" : "Log In"}
                    </button>
                </form>

                {/* Toggle between Login and Signup */}
                <p className="mt-6 text-center">
                    {isCreatingAccount ? (
                        <>
                            Already have an account?{" "}
                            <button onClick={() => setIsCreatingAccount(false)} className="link link-primary">
                                Log In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <button onClick={() => setIsCreatingAccount(true)} className="link link-primary">
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

import React from 'react';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-blue-900 to-black text-primary-content">
      {/* Left Side - Form with Blue-to-Black Gradient */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-blue-900 to-black p-8">
        <div className="w-full max-w-md bg-opacity-90 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          {/* Register Form */}
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-bold text-sm" htmlFor="name">Full Name</label>
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
              <label className="block mb-2 text-sm text-white" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="input input-bordered w-full bg-base-200 text-primary-content"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
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

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 h-screen">
        <img
          src="/LandingPage.jpg" // Your image path
          alt="StockSavvy Registration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default RegisterPage;


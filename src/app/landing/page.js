import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto p-8 bg-base-300 rounded-lg shadow-2xl flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Section - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          {/* Placeholder for your finance-related image */}
          <div className="relative w-64 h-64 md:w-full md:h-80">
            <Image
              src="/placeholder-image.jpg" // Replace with your actual image
              alt="Finance Related"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">Welcome Back</h1>
            
            {/* Login Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-primary-content text-sm font-medium mb-1">Email address</label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-base-200 text-primary-content"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-primary-content text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full bg-base-200 text-primary-content"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <Link href="/forgot-password">
                  <a className="text-sm link link-primary">Forgotten password?</a>
                </Link>
              </div>
              <button className="btn btn-primary w-full mt-4">Log in</button>
            </form>

            {/* Social Login Buttons */}
            <div className="divider text-primary-content">or log in with</div>
            <div className="flex justify-center gap-4">
              <button className="btn btn-outline btn-primary rounded-full">F</button>
              <button className="btn btn-outline btn-primary rounded-full">G</button>
              <button className="btn btn-outline btn-primary rounded-full">T</button>
              <button className="btn btn-outline btn-primary rounded-full">A</button>
            </div>

            {/* Sign-up Link */}
            <p className="text-center text-primary-content text-sm mt-6">
              Need an account? <Link href="/register"><a className="link link-primary">Sign up</a></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

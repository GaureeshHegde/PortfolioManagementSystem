import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-6">
            <div className="flex justify-between items-center">
                <div className="text-white text-lg">Your Logo</div>
                <div>
                    <Link href="/" className="text-white px-4">Home</Link>
                    <Link href="/watchlist" className="text-white px-4">Watchlist</Link>
                    <Link href="/holdings" className="text-white px-4">Holdings</Link>
                    <Link href="/order" className="text-white px-4">Orders</Link>
                    <Link href="/funds" className="text-white px-4">Funds</Link>
                    <div className="relative group inline-block">
                        <div className="text-white px-4">Username</div>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white right-0 mt-2 rounded-lg shadow-lg">
                            <Link href="/about-us" className="block px-4 py-2">About Us</Link>
                            <Link href="/support" className="block px-4 py-2">Customer Support</Link>
                            <Link href="/logout" className="block px-4 py-2">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};  

export default Navbar;

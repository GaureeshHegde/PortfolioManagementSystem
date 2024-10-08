import Link from 'next/link';

const Navbar = () => {
    return (
        // <nav className="navbar bg-base-100 shadow-lg">
        //     <div className="flex-1">
        //         <a className="text-xl font-bold text-primary">Your Logo</a>
        //     </div>
        //     <div className="flex-none">
        //         <ul className="menu menu-horizontal px-1">
        //             <li>
        //                 <Link href="/" className="btn btn-ghost text-primary">Home</Link>
        //             </li>
        //             <li>
        //                 <Link href="/login" className="btn btn-ghost text-primary">Login</Link>
        //             </li>
        //             <li>
        //                 <Link href="/register" className="btn btn-ghost text-primary">Sign Up</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost text-xl">Logo</Link>
            </div>
            <div className="navbar-end">
                <Link href="/login" className="btn">Login</Link>
                <Link href="/register" className="btn">Signup</Link>
                <div className="pt-32 text-red-500">Hi</div>
            </div>
        </div>
    );
};

export default Navbar;

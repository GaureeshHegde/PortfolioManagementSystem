import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './globals.css';
import { Toaster } from 'react-hot-toast'; // Import Toaster

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="bg-blue-400 text-white">
                <Navbar />
                <Toaster />
                {children}
                <Footer />
            </body>
        </html>
    );
}

import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './globals.css';
import { Toaster } from 'react-hot-toast'; // Import Toaster

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Navbar />
            {children}
            <Footer />
            </body>
        </html>
    );
}

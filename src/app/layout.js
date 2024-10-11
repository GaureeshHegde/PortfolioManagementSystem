import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './globals.css';

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="bg-blue-300 text-white">
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}

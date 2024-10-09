import Navbar from './components/Navbar'; // Adjust the path if needed
import './globals.css';

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-white">
                <Navbar />
                {children}
            </body>
        </html>
    );
}

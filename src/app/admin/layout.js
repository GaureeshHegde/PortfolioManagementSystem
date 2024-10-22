
import '../globals.css';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import PageNavbar from '../components/PageNavbar';

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <PageNavbar />
            {children}
            </body>
        </html>
    );
}
import Navbar from './components/Navbar'; // Adjust the path if needed

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

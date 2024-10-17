import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 YourCompany. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-6">
          <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram className="text-white text-2xl hover:text-gray-400" />
          </Link>
          <Link href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
            <FaLinkedin className="text-white text-2xl hover:text-gray-400" />
          </Link>
          <Link href="https://www.twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter className="text-white text-2xl hover:text-gray-400" />
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/faqs" className="text-sm text-gray-400 hover:text-white">
            FAQ's
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

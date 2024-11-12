// AdminWrapper.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const AdminWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const secretKey = process.env.JWT_SECRET; // replace with your JWT secret
  const allowedUsername = 'your_username'; // replace with the username you want to check

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.username === allowedUsername) {
          setIsAuthorized(true);
        } else {
          router.replace('/'); // redirect to home if unauthorized
        }
      } catch (error) {
        console.error('Invalid or expired token:', error);
        router.replace('/'); // redirect to home if decoding fails
      }
    } else {
      router.replace('/'); // redirect to home if no token
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // optionally, show a loading indicator here
  }

  return <>{children}</>;
};

export default AdminWrapper;

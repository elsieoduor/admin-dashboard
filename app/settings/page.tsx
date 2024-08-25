'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { firstName: '', lastName: '', email: '', phone: '', address: '', role: '' };
  }
};

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const data = await fetchUserProfile(storedToken);
          setProfile(data);
        } catch (err) {
          console.error('Failed to load profile:', err);
          setError('Failed to load profile');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No authentication token found.');
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-4 max-w-2xl mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.firstName || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.lastName || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.email || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.phone || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.address || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 p-2 border rounded-lg w-full">{profile.role || 'N/A'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

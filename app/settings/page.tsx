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

const updateUserProfile = async (profile: { firstName: string; lastName: string; email: string; phone: string; address: string; role: string }, token: string) => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
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
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        await updateUserProfile(profile, storedToken);
        setSuccess('Profile updated successfully!');
        setError('');
      } catch (error) {
        setError('Failed to update profile');
        setSuccess('');
      }
    } else {
      setError('No authentication token found.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    router.push('/login'); // Redirect to login page
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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-lg w-full"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    {/* Add more roles as necessary */}
                  </select>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
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

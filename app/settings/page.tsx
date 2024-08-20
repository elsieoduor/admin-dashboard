'use client'
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
// import { getSession } from 'next-auth/react';

const fetchUserProfile = async () => {
  // Replace with your actual API call
  return { name: 'Admin', email: 'admin@example.com' };
};

const updateUserProfile = async (profile: { name: string; email: string }) => {
  // Replace with your actual API call
  console.log('Updated profile:', profile);
};

const Settings = () => {
//   const [profile, setProfile] = useState({ name: '', email: '' });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       const session = await getSession();
//       if (session) {
//         const data = await fetchUserProfile();
//         setProfile(data);
//       }
//       setLoading(false);
//     };
//     loadProfile();
//   }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await updateUserProfile(profile);
    alert('Profile updated successfully!');
  };

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                //   value={profile.name}
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
                //   value={profile.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const addTechnician = async (technician: any) => {
  // Replace with your actual API call
  console.log('Adding technician:', technician);
};

const AddTechnician = () => {
  const [technician, setTechnician] = useState({
    name: '',
    category: '',
    email: '',
    photo: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTechnician(technician);
    alert('Technician added successfully!');
    router.push('/technicians');
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold">Add Technician</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={technician.name}
                  onChange={(e) => setTechnician({ ...technician, name: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={technician.category}
                  onChange={(e) => setTechnician({ ...technician, category: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={technician.email}
                  onChange={(e) => setTechnician({ ...technician, email: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
                <input
                  type="text"
                  value={technician.photo}
                  onChange={(e) => setTechnician({ ...technician, photo: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-lg"
              >
                Add Technician
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTechnician;

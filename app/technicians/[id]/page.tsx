'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

interface Technician {
  id: string;
  name: string;
  category: string;
  email: string;
  photo: string;
}

// Mock function to fetch technician data
const fetchTechnician = async (id: string): Promise<Technician> => {
  // Replace with your actual API call
  return { id: '1', name: 'John Doe', category: 'Electrician', email: 'john.doe@example.com', photo: '/images/profile1.jpg' };
};

// Mock function to update technician data
const updateTechnician = async (id: string, technician: Technician) => {
  // Replace with your actual API call
  console.log('Updating technician:', id, technician);
};

const TechnicianDetail = () => {
  const [technician, setTechnician] = useState<Technician | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string | undefined;

  useEffect(() => {
    const getTechnician = async () => {
      if (id) {
        try {
          const data = await fetchTechnician(id);
          setTechnician(data);
        } catch (error) {
          console.error('Failed to fetch technician:', error);
        }
      }
    };
    
    getTechnician();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && technician) {
      try {
        await updateTechnician(id, technician);
        alert('Technician updated successfully!');
        router.push('/technicians'); // Navigate back to the technicians list page
      } catch (error) {
        console.error('Failed to update technician:', error);
        alert('Failed to update technician.');
      }
    }
  };

  if (!technician) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Technician Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Image src={technician.photo} alt={technician.name} width={120} height={120} className="w-24 h-24 rounded-full mr-6" />
              <div>
                <h3 className="text-xl font-semibold">{technician.name}</h3>
                <p className="text-gray-600">{technician.category}</p>
                <p className="text-gray-600">{technician.email}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={technician.name}
                  onChange={(e) => setTechnician({ ...technician, name: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={technician.category}
                  onChange={(e) => setTechnician({ ...technician, category: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={technician.email}
                  onChange={(e) => setTechnician({ ...technician, email: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
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

export default TechnicianDetail;

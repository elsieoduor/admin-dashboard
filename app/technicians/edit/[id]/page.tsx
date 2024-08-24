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

// Fetch technician data from the API
const fetchTechnician = async (id: string): Promise<Technician> => {
  try {
    const response = await fetch(`/api/technicians/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch technician data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching technician:', error);
    throw error;
  }
};

// Update technician data via the API
const updateTechnician = async (id: string, technician: Technician) => {
  try {
    const response = await fetch(`/api/technicians/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(technician),
    });

    if (!response.ok) {
      throw new Error('Failed to update technician');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating technician:', error);
    throw error;
  }
};

const EditTechnician = () => {
  const [technician, setTechnician] = useState<Technician | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const getTechnician = async () => {
      if (id) {
        try {
          const data = await fetchTechnician(id as string);
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
        await updateTechnician(id as string, technician);
        alert('Technician updated successfully!');
        router.push(`/technicians/${id}`); 
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
          <h2 className="text-2xl font-bold">Edit Technician</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <Image src={technician.photo} alt={technician.name} width={120} height={120} className="w-24 h-24 rounded-full mb-4" />
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

export default EditTechnician;

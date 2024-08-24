'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { PencilAltIcon, EyeIcon, TrashIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

interface Technician {
  id: string;
  name: string;
  category: string;
  email: string;
  photo: string;
}

// Fetch technicians data from the API
const fetchTechnicians = async (search: string): Promise<Technician[]> => {
  try {
    const response = await fetch(`/api/technicians?search=${search}`);
    if (!response.ok) {
      throw new Error('Failed to fetch technicians');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return [];
  }
};

// Delete technician data via the API
const deleteTechnician = async (id: string) => {
  try {
    const response = await fetch(`/api/technicians/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete technician');
    }
  } catch (error) {
    console.error('Error deleting technician:', error);
    throw error;
  }
};

const Technicians = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getTechnicians = async () => {
      const data = await fetchTechnicians(search);
      setTechnicians(data);
    };
    getTechnicians();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this technician?')) {
      try {
        await deleteTechnician(id);
        setTechnicians(technicians.filter(tech => tech.id !== id));
      } catch (error) {
        alert('Failed to delete technician.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold">Technicians</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search technicians..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-2 mr-4"
            />
            <Link href="/technicians/add">
              <button className="bg-primary text-white py-2 px-4 rounded">
                Add Technician
              </button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Photo</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Name</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Category</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Email</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((tech) => (
                  <tr key={tech.id} className="hover:bg-blue-50">
                    <td className="border-b p-3">
                      <Image
                        src={tech.photo}
                        alt={tech.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="border-b p-3">{tech.name}</td>
                    <td className="border-b p-3">{tech.category}</td>
                    <td className="border-b p-3">{tech.email}</td>
                    <td className="border-b p-3 flex space-x-2">
                      <Link href={`/technicians/${tech.id}`}>
                        <button className="p-2 hover:bg-blue-100 rounded">
                          <EyeIcon className="w-6 h-6 text-blue-500" />
                        </button>
                      </Link>
                      <Link href={`/technicians/edit/${tech.id}`}>
                        <button className="p-2 hover:bg-yellow-100 rounded">
                          <PencilAltIcon className="w-6 h-6 text-yellow-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(tech.id)}
                        className="p-2 hover:bg-red-100 rounded"
                      >
                        <TrashIcon className="w-6 h-6 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Technicians;

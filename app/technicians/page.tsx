'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { PencilAltIcon, EyeIcon, TrashIcon } from '@heroicons/react/outline';

interface Technician {
  id: string;
  name: string;
  category: string;
  email: string;
  photo: string;
}

// Mock data fetching
const fetchTechnicians = async (search: string): Promise<Technician[]> => {

  return [
    { id: '1', name: 'John Doe', category: 'Electrician', email: 'john.doe@example.com', photo: '/images/profile1.jpg' },
    { id: '2', name: 'Jane Smith', category: 'Plumber', email: 'jane.smith@example.com', photo: '/images/profile2.jpg' },
  ].filter(tech => tech.name.toLowerCase().includes(search.toLowerCase()));
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
            <button
              onClick={() => router.push('/technicians/add')}
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Add Technician
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Photo</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((tech) => (
                  <tr key={tech.id}>
                    <td><img src={tech.photo} alt={tech.name} className="w-12 h-12 rounded-full" /></td>
                    <td>{tech.name}</td>
                    <td>{tech.category}</td>
                    <td>{tech.email}</td>
                    <td className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/technicians/${tech.id}`)}
                        className="p-2 hover:bg-blue-100 rounded"
                      >
                        <EyeIcon className="w-6 h-6 text-blue-500" />
                      </button>
                      <button
                        onClick={() => router.push(`/technicians/edit/${tech.id}`)}
                        className="p-2 hover:bg-yellow-100 rounded"
                      >
                        <PencilAltIcon className="w-6 h-6 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this technician?')) {
                            // Call API to delete technician
                            console.log('Deleting technician:', tech.id);
                          }
                        }}
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

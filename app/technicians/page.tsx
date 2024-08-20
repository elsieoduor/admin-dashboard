'use client'
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

const fetchTechnicians = async () => {
  // Replace with your API call
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    // More data...
  ];
};

const Technicians = () => {
  const [technicians, setTechnicians] = useState<any[]>([]);

  useEffect(() => {
    const getTechnicians = async () => {
      const data = await fetchTechnicians();
      setTechnicians(data);
    };
    getTechnicians();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">Technicians</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((tech) => (
                  <tr key={tech.id}>
                    <td className="border p-2">{tech.id}</td>
                    <td className="border p-2">{tech.name}</td>
                    <td className="border p-2">{tech.email}</td>
                    <td className="border p-2">{tech.status}</td>
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

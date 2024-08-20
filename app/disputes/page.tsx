'use client'
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

const fetchDisputes = async () => {
  // Replace with your actual API call
  return [
    { id: 1, issue: 'Delayed service', status: 'Resolved' },
    { id: 2, issue: 'Incorrect billing', status: 'Pending' },
  ];
};

const Disputes = () => {
  const [disputes, setDisputes] = useState<any[]>([]);

  useEffect(() => {
    const getDisputes = async () => {
      const data = await fetchDisputes();
      setDisputes(data);
    };
    getDisputes();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">Disputes</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Issue</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dis) => (
                  <tr key={dis.id}>
                    <td className="border p-2">{dis.id}</td>
                    <td className="border p-2">{dis.issue}</td>
                    <td className="border p-2">{dis.status}</td>
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

export default Disputes;

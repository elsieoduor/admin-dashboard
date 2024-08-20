'use client'
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

const fetchActivity = async () => {
  // Replace with your actual API call
  return [
    { id: 1, action: 'User registered', timestamp: '2024-08-20T10:00:00Z' },
    { id: 2, action: 'Technician assigned', timestamp: '2024-08-20T11:00:00Z' },
  ];
};

const Activity = () => {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const getActivity = async () => {
      const data = await fetchActivity();
      setActivity(data);
    };
    getActivity();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">Activity</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((act) => (
                  <tr key={act.id}>
                    <td className="border p-2">{act.id}</td>
                    <td className="border p-2">{act.action}</td>
                    <td className="border p-2">{new Date(act.timestamp).toLocaleString()}</td>
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

export default Activity;

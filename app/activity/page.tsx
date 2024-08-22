'use client';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

// Mock function to fetch activity data
const fetchActivity = async () => {
  // Simulate fetching data from an API
  return [
    { id: 1, action: 'User registered', timestamp: '2024-08-20T10:00:00Z', status: 'complete' },
    { id: 2, action: 'Technician assigned', timestamp: '2024-08-20T11:00:00Z', status: 'pending' },
    // Add more dummy data if needed
  ];
};

// Component for the Activity page
const Activity = () => {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const getActivity = async () => {
      const data = await fetchActivity();
      setActivity(data);
    };

    getActivity();
    
    // Refresh activity every 30 seconds
    const intervalId = setInterval(() => {
      getActivity();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to format timestamp to a readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-blue-50">
          <h2 className="text-3xl font-bold text-blue-800">Activity Log</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">ID</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Action</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Timestamp</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((act) => (
                  <tr key={act.id} className="hover:bg-blue-50">
                    <td className="border-b p-3">{act.id}</td>
                    <td className="border-b p-3">{act.action}</td>
                    <td className="border-b p-3">{formatTimestamp(act.timestamp)}</td>
                    <td className={`border-b p-3 text-center${getStatusColor(act.status)}`}>
                      {act.status.charAt(0).toUpperCase() + act.status.slice(1)}
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

export default Activity;

'use client';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

// Mock function to fetch disputes data
const fetchDisputes = async () => {
  // Simulate fetching data from an API
  return [
    { id: 1, issue: 'Delayed service', status: 'Resolved' },
    { id: 2, issue: 'Incorrect billing', status: 'Pending' },
    // Add more dummy data if needed
  ];
};

// Component for the Disputes page
const Disputes = () => {
  const [disputes, setDisputes] = useState<any[]>([]);

  useEffect(() => {
    const getDisputes = async () => {
      const data = await fetchDisputes();
      setDisputes(data);
    };

    getDisputes();
    
    // Refresh disputes every 30 seconds
    const intervalId = setInterval(() => {
      getDisputes();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unresolved':
        return 'bg-red-100 text-red-800';
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
          <h2 className="text-3xl font-bold text-blue-800">Disputes</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">ID</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Issue</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dis) => (
                  <tr key={dis.id} className="hover:bg-blue-50">
                    <td className="border-b p-3">{dis.id}</td>
                    <td className="border-b p-3">{dis.issue}</td>
                    <td className={`border-b p-3 text-center ${getStatusColor(dis.status)}`}>
                      {dis.status}
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

export default Disputes;

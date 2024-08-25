'use client';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Dispute {
  id: string;
  issue: string;
  status: string;
}

const fetchDisputes = async (search: string): Promise<Dispute[]> => {
  try {
    const response = await fetch(`/api/disputes?search=${encodeURIComponent(search)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch disputes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching disputes:', error);
    return [];
  }
};

const updateDisputeStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(`/api/disputes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update dispute status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating dispute status:', error);
    throw error;
  }
};

const Disputes = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getDisputes = async () => {
      try {
        const data = await fetchDisputes(search);
        setDisputes(data);
      } catch (error) {
        setError('Failed to fetch disputes');
      }
    };

    getDisputes();

    const intervalId = setInterval(() => {
      getDisputes();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [search]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDisputeStatus(id, status);
      setDisputes(prev => prev.map(dispute =>
        dispute.id === id ? { ...dispute, status } : dispute
      ));
      setSuccess('Dispute status updated successfully');
    } catch (error) {
      setError('Failed to update dispute status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Incomplete':
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-800">Disputes</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/disputes/add')}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Dispute
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search disputes..."
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Issue</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Status</th>
                  <th className="border-b-2 border-blue-200 p-3 text-left text-blue-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dis) => (
                  <tr key={dis.id} className="hover:bg-blue-50">
                    <td className="border-b p-3">{dis.issue}</td>
                    <td className={`border-b p-3 text-center ${getStatusColor(dis.status)}`}>
                      {dis.status}
                    </td>
                    <td className="border-b p-3 text-center">
                      <select
                        value={dis.status}
                        onChange={(e) => handleStatusChange(dis.id, e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Incomplete">Incomplete</option>
                      </select>
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

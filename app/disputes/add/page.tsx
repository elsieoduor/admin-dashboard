'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddDispute = () => {
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState('Incomplete');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!issue) {
      setError('Issue description is required');
      return;
    }

    try {
      const response = await fetch('/api/disputes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to add dispute');
      }

      setSuccess('Dispute added successfully');
      setIssue('');
      setStatus('Incomplete');

      // Redirect to the Disputes page
      setTimeout(() => {
        router.push('/disputes');
      }, 1000); // Delay to let the success message be visible

    } catch (error) {
      setError('Failed to add dispute');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-blue-50">
          <h2 className="text-3xl font-bold text-blue-800">Add a Dispute</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Issue</label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                  rows={4}
                  placeholder="Describe the issue..."
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Dispute
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDispute;

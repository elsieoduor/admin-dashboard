'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';
import Spinner from '@/components/Spinner';


interface Technician {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  profilePicture: string;
  bio: string;
  skills: string[];
  availabilityStatus: 'active' | 'inactive' | 'working';
  workingHours: string;
  serviceCategory: string;
}

const addTechnician = async (technician: Technician) => {
  try {
    const response = await fetch('/api/technicians', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(technician),
    });

    if (!response.ok) {
      throw new Error('Failed to add technician');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding technician:', error);
    throw error;
  }
};

const AddTechnician = () => {
  const [technician, setTechnician] = useState<Technician>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    profilePicture: '',
    bio: '',
    skills: [],
    availabilityStatus: 'active',
    workingHours: '',
    serviceCategory: ''
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await addTechnician(technician);
      toast.success('Technician added successfully!');
      
      setTimeout(() => {
        router.push('/technicians');
      }, 2000);
  
    } catch (error) {
      console.error('Failed to add technician:', error);
      toast.error('Failed to add technician.');
    }finally {
      setIsLoading(false);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechnician(prev => ({
      ...prev,
      skills: value.split(',').map(skill => skill.trim())
    }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold">Add Technician</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={technician.firstName}
                  onChange={(e) => setTechnician({ ...technician, firstName: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={technician.lastName}
                  onChange={(e) => setTechnician({ ...technician, lastName: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={technician.phoneNumber}
                  onChange={(e) => setTechnician({ ...technician, phoneNumber: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={technician.email}
                  onChange={(e) => setTechnician({ ...technician, email: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                <input
                  type="text"
                  value={technician.profilePicture}
                  onChange={(e) => setTechnician({ ...technician, profilePicture: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                  placeholder="e.g., http://example.com/photo.jpg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={technician.bio}
                  onChange={(e) => setTechnician({ ...technician, bio: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={technician.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Availability Status</label>
                <select
                  value={technician.availabilityStatus}
                  onChange={(e) => setTechnician({ ...technician, availabilityStatus: e.target.value as Technician['availabilityStatus'] })}
                  className="mt-1 p-2 border rounded-lg w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="working">Working</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                <input
                  type="text"
                  value={technician.workingHours}
                  onChange={(e) => setTechnician({ ...technician, workingHours: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Service Category</label>
                <input
                  type="text"
                  value={technician.serviceCategory}
                  onChange={(e) => setTechnician({ ...technician, serviceCategory: e.target.value })}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              >
                {isLoading ? <Spinner/> : "Add Technician"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTechnician;

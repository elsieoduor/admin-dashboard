'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface DashboardData {
  users: number;
  technicians: number;
  serviceRequests: number;
  visits: number[];
  serviceRequestsData: number[];
}

// Mock fetch function
const fetchDashboardData = async (): Promise<DashboardData> => {
  return {
    users: 1200,
    technicians: 45,
    serviceRequests: 300,
    visits: [50, 100, 150, 200, 250, 300, 350],
    serviceRequestsData: [10, 20, 30, 40, 50, 60, 70]
  };
};

const Dashboard = () => {
  // Initialize state with the DashboardData interface
  const [data, setData] = useState<DashboardData>({
    users: 0,
    technicians: 0,
    serviceRequests: 0,
    visits: [],
    serviceRequestsData: []
  });

  useEffect(() => {
    const getData = async () => {
      const result = await fetchDashboardData();
      setData(result);
    };
    getData();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Visits',
        data: data.visits,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      },
      {
        label: 'Service Requests',
        data: data.serviceRequestsData,
        backgroundColor: 'rgba(229, 231, 235, 0.5)',
        borderColor: 'rgba(229, 231, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`
        }
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-2xl font-bold">{data.users}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">Technicians</h3>
              <p className="text-2xl font-bold">{data.technicians}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">Service Requests</h3>
              <p className="text-2xl font-bold">{data.serviceRequests}</p>
            </motion.div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold">Service Visits and Requests</h3>
            <div className="mt-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

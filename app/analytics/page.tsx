'use client';

import { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement);

const fetchAnalytics = async () => {
  // Replace with your actual API call
  return {
    serviceRequests: 120,
    technicianPerformance: 85,
    customerSatisfaction: 90,
    topPerformers: [
      { name: 'Plumbing', services: 50 },
      { name: 'Generator Installation', services: 45 },
      { name: 'Borehole Test Plumbing', services: 40 },
      { name: 'Irrigation Installation', services: 35 },
      { name: 'Heat Pump Inspection', services: 30 }
    ],
    leastPerformers: [
      { name: 'Site Survey', services: 10 },
      { name: 'Swimming Pool Inspection', services: 5 },
      { name: 'Sewage Pump Inspection', services: 9 },
      { name: 'Water Treatment: UF Plant', services: 6 },
      { name: 'Borehole Pump Lifting', services: 6 }
    ]
  };
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>({});

  useEffect(() => {
    const getAnalytics = async () => {
      const data = await fetchAnalytics();
      setAnalytics(data);
    };
    getAnalytics();
  }, []);

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Service Requests',
        data: [50, 60, 70, 80, 90, 100, 120],
        borderColor: '#1E90FF',
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Performance', 'Not Performing'],
    datasets: [
      {
        data: [analytics.technicianPerformance, 100 - analytics.technicianPerformance],
        backgroundColor: ['#1E90FF', '#D3D3D3'],
        borderColor: ['#1E90FF', '#D3D3D3'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-blue-600">Analytics Dashboard</h2>
            <div className="flex flex-col md:flex-row justify-between mt-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex-1 mr-4">
                <h3 className="text-xl font-semibold text-blue-700">Service Requests</h3>
                <p className="text-3xl font-bold text-blue-900">{analytics.serviceRequests}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex-1 mx-4">
                <h3 className="text-xl font-semibold text-blue-700">Technician Performance</h3>
                <p className="text-3xl font-bold text-blue-900">{analytics.technicianPerformance}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex-1 ml-4">
                <h3 className="text-xl font-semibold text-blue-700">Customer Satisfaction</h3>
                <p className="text-3xl font-bold text-blue-900">{analytics.customerSatisfaction}%</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-start">
            <div className="flex-1 mr-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Technician Performance</h3>
              <div className="w-full max-w-xs mx-auto">
                <Doughnut data={doughnutChartData} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Top Performers in 6 months</h3>
              <ul className="list-disc pl-5 space-y-2">
                {analytics.topPerformers && analytics.topPerformers.map((performer: any, index: number) => (
                  <li key={index} className="text-blue-900">
                    <span className="font-semibold">{performer.name}</span> - {performer.services} services
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold text-blue-700 my-4">Least Performers in 6 months</h3>
              <ul className="list-disc pl-5 space-y-2">
                {analytics.leastPerformers && analytics.leastPerformers.map((performer: any, index: number) => (
                  <li key={index} className="text-blue-900">
                    <span className="font-semibold">{performer.name}</span> - {performer.services} services
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700">Service Requests Over Time</h3>
            <Line data={lineChartData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;

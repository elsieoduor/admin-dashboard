'use client'
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

const fetchAnalytics = async () => {
  // Replace with your actual API call
  return {
    serviceRequests: 120,
    technicianPerformance: 85,
    customerSatisfaction: 90
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold">Service Requests</h3>
                <p className="text-2xl font-bold">{analytics.serviceRequests}</p>
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold">Technician Performance</h3>
                <p className="text-2xl font-bold">{analytics.technicianPerformance}%</p>
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
                <p className="text-2xl font-bold">{analytics.customerSatisfaction}%</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;

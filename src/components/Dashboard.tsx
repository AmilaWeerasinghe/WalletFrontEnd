import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoBackButton } from './Styles/ButtonStyles'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SummaryData {
  category: string;
  totalAmount: number;
}

const Dashboard: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([]);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const response = await axios.get<SummaryData[]>('http://localhost:5002/expenses/summary');
      setSummaryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <ResponsiveContainer width="100%" height={300}>
      <BarChart data={summaryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" /> {/* Use the 'category' field from the data as the X-axis */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalAmount" fill="#8884d8" /> {/* Use the 'totalAmount' field from the data as the dataKey */}
      </BarChart>
    </ResponsiveContainer>
     {/* Add the "Go Back" button to navigate back to the homepage */}
     <GoBackButton to="/">Go Back</GoBackButton>
    </div>
    
    
  );
};

export default Dashboard;

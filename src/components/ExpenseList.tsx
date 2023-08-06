// Add imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the ExpenseList component
const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>
      {/* Display the list of expenses */}
      {/* Implement the logic to render expense details */}
    </div>
  );
};

export default ExpenseList;

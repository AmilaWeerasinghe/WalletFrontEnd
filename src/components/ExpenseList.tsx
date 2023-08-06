import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Styles/ExpenseList.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Expense {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  amount: number;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Add selectedCategory state

  // Function to fetch the list of expenses from the backend API
  const fetchExpenses = async () => {
    try {
      const response = await axios.get<Expense[]>('http://localhost:5002/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchExpenses once when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (expenseId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5002/expenses/${expenseId}`);
        // After deleting, fetch the updated list of expenses
        fetchExpenses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h2>Expense List</h2>
      {/* Add the dropdown */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">Select a Category</option>
        <option value="Food">Food</option>
        <option value="Health">Health</option>
        <option value="Transportation">Transportation</option>
        <option value="Household">Household</option>
        <option value="Social Life">Social Life</option>
        <option value="Miscellaneous">Miscellaneous</option>
        {/* Add more categories here as needed */}
      </select>
      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <div className="expense-container">
          {/* Filter expenses based on selectedCategory */}
          {expenses
            .filter((expense) => selectedCategory === 'All' || expense.category === selectedCategory)
            .map((expense: Expense) => (
              <div className="expense-box" key={expense._id}>
                <strong>Title: </strong>{expense.title}<br />
                <strong>Description: </strong>{expense.description}<br />
                <strong>Date: </strong>{expense.date}<br />
                <strong>Category: </strong>{expense.category}<br />
                <strong>Amount: </strong>{expense.amount}<br />
                <button onClick={() => handleDelete(expense._id)}>
                  <DeleteIcon /> Delete
                </button>
                <Link to={`/expenses/edit/${expense._id}`}>
                  <EditIcon /> Edit
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

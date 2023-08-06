import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link instead of useNavigate

interface Expense {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  amount: number;
}

const EditExpensePage: React.FC = () => {
  const { id } = useParams(); // Use useParams to get the ID from the URL
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/expenses/${id}`);
      setExpense(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExpense((prevExpense) => ({
      ...prevExpense!,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5002/expenses/${id}`, expense);
      // Redirect back to the expense list after editing
      window.location.href = '/expenses'; // You can use the URL or any other method to navigate
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      {expense ? (
        <div>
          <label>
            Title:
            <input type="text" name="title" value={expense.title} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={expense.description} onChange={handleInputChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={expense.date} onChange={handleInputChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={expense.category} onChange={handleInputChange} />
          </label>
          <label>
            Amount:
            <input type="number" name="amount" value={expense.amount} onChange={handleInputChange} />
          </label>
          <button onClick={handleSubmit}>Save</button>
          {/* Add the "Go Back" button to navigate back to the homepage */}
          <Link to="/">Go Back</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/expenses">Back to Expense List</Link> {/* Link to navigate back to the expense list */}
    </div>
  );
};

export default EditExpensePage;

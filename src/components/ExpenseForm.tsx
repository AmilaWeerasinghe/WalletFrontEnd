import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    date: '',
    category: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make an API call to create or update the expense based on the existence of an ID
      if (formData._id) {
        await axios.patch(`http://localhost:5002/expenses/${formData._id}`, formData);
      } else {
        await axios.post('http://localhost:5002/expenses', formData);
      }
      // Clear the form after successful submission
      setFormData({
        _id: '',
        title: '',
        description: '',
        date: '',
        category: '',
        amount: '',
      });
      // Optionally, you can also refresh the expense list after form submission
      // by calling a function to fetch expenses from the server again.
    } catch (error) {
      console.error(error);
      // Handle any error that might occur during API call or form submission
    }
  };

  return (
    <div>
      <h2>Create/Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ExpenseForm;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import EditExpensePage from './components/EditExpensePage';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      <Router>
        <nav>
          {/* Use Link to navigate to the ExpenseForm */}
          <Link to="/expenses/new">Create Expense</Link>
          {/* Use Link to navigate to the Dashboard */}
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/new" element={<ExpenseForm />} />
          <Route path="/expenses/edit/:id" element={<EditExpensePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

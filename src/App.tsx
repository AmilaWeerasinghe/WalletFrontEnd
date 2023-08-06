import React from 'react';
import './App.css';

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker App</h1>
      <ExpenseList />
      <ExpenseForm />
      <Dashboard />
    </div>
  );
}

export default App;

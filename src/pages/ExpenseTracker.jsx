import { useState } from "react";
import ExpenseForm from "../components/expense/ExpenseForm.jsx";
import ExpenseList from "../components/expense/ExpenseList.jsx";
import ExpenseSummary from "../components/expense/ExpenseSummary.jsx";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

  const handleAdd = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="page">
      <div className="card card-wide">
        <h2>Expense Tracker</h2>
        <p className="page-desc">Practice: component communication, calculations</p>

        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default ExpenseTracker;

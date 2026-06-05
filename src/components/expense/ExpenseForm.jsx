import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = description.trim();
    const value = Number(amount);
    if (!trimmed || amount === "" || Number.isNaN(value) || value <= 0) return;

    onAdd({ id: Date.now(), description: trimmed, amount: value });
    setDescription("");
    setAmount("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description (e.g. Lunch)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;

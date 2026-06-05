function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-msg">No expenses yet.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <span className="expense-desc">{expense.description}</span>
          <span className="expense-amount">${expense.amount.toFixed(2)}</span>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;

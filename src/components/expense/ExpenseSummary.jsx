function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="expense-summary">
      <span>Total expenses</span>
      <strong>${total.toFixed(2)}</strong>
      <span className="expense-count">{expenses.length} item(s)</span>
    </div>
  );
}

export default ExpenseSummary;

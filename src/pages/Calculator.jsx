import { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = (op) => {
    const a = Number(num1);
    const b = Number(num2);

    if (num1 === "" || num2 === "" || Number.isNaN(a) || Number.isNaN(b)) {
      setError("Enter valid numbers in both fields.");
      setResult(null);
      return;
    }

    if (op === "divide" && b === 0) {
      setError("Cannot divide by zero.");
      setResult(null);
      return;
    }

    setError("");
    let value;
    switch (op) {
      case "add":
        value = a + b;
        break;
      case "subtract":
        value = a - b;
        break;
      case "multiply":
        value = a * b;
        break;
      case "divide":
        value = a / b;
        break;
      default:
        return;
    }
    setResult(value);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Calculator</h2>
        <p className="page-desc">Practice: state updates, functions</p>

        <div className="calc-inputs">
          <input
            type="number"
            placeholder="First number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Second number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>

        <div className="btn-row">
          <button type="button" onClick={() => calculate("add")}>
            +
          </button>
          <button type="button" onClick={() => calculate("subtract")}>
            −
          </button>
          <button type="button" onClick={() => calculate("multiply")}>
            ×
          </button>
          <button type="button" onClick={() => calculate("divide")}>
            ÷
          </button>
        </div>

        {error && <p className="field-error">{error}</p>}
        {result !== null && !error && (
          <p className="calc-result">
            Result: <strong>{result}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default Calculator;

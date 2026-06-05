import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="card">
        <h2>Counter App</h2>
        <p className="page-desc">Practice: useState, event handling</p>

        <p className="counter-display">{count}</p>

        <div className="btn-row">
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            Increment
          </button>
          <button type="button" onClick={() => setCount((c) => c - 1)}>
            Decrement
          </button>
          <button type="button" className="btn-secondary" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;

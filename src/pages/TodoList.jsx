import { useState } from "react";

function TodoList() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }]);
    setText("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Todo List</h2>
        <p className="page-desc">Practice: state management, map & filter</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-msg">No tasks yet.</p>
        ) : (
          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span>{task.text}</span>
                </label>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;

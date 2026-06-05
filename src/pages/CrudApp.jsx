import { useState } from "react";

function CrudApp() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editId) {
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, name: name.trim() } : user
        )
      );
      setEditId(null);
    } else {
      setUsers([...users, { id: Date.now(), name: name.trim() }]);
    }

    setName("");
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (editId === id) {
      setName("");
      setEditId(null);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>React CRUD App</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <button type="button" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {users.length === 0 ? (
          <p className="empty-msg">No users yet. Add one above.</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>

                <div className="actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CrudApp;

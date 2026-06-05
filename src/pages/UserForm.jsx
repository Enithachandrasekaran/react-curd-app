import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "Enter a valid email.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSubmitted(null);
      return;
    }
    setSubmitted({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="page">
      <div className="card">
        <h2>User Form</h2>
        <p className="page-desc">Practice: controlled components, form validation</p>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <div className="submitted-data">
            <h3>Submitted data</h3>
            <p>
              <strong>Name:</strong> {submitted.name}
            </p>
            <p>
              <strong>Email:</strong> {submitted.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;

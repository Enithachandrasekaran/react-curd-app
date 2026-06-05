import { Link } from "react-router-dom";

const apps = [
  {
    to: "/counter",
    title: "1. Counter App",
    practice: "useState, event handling",
    features: "Increment, Decrement, Reset",
  },
  {
    to: "/todo",
    title: "2. Todo List",
    practice: "State management, map & filter",
    features: "Add, delete, mark completed",
  },
  {
    to: "/form",
    title: "3. User Form",
    practice: "Controlled components, validation",
    features: "Name, email, submit & display data",
  },
  {
    to: "/calculator",
    title: "4. Calculator",
    practice: "State updates, functions",
    features: "+, −, ×, ÷",
  },
  {
    to: "/weather",
    title: "5. Weather App",
    practice: "API calls, useEffect, fetch",
    features: "Search city, temperature, condition",
  },
  {
    to: "/notes",
    title: "8. Notes App",
    practice: "Local storage, state management",
    features: "Add, edit, delete notes, save to browser",
  },
  {
    to: "/expenses",
    title: "9. Expense Tracker",
    practice: "Component communication, calculations",
    features: "Add, delete expense, total amount",
  },
  {
    to: "/movies",
    title: "10. Movie Search App",
    practice: "API integration, loading states",
    features: "Search movies, cards, ratings",
  },
  {
    to: "/crud",
    title: "Bonus: CRUD App",
    practice: "Full CRUD with arrays",
    features: "Add, edit, delete users",
  },
];

function Home() {
  return (
    <div className="page">
      <div className="home-intro">
        <h2>Choose a practice app</h2>
        <p>Use the navigation bar above or open any card below.</p>
      </div>
      <div className="home-grid">
        {apps.map((app) => (
          <Link key={app.to} to={app.to} className="home-card">
            <h3>{app.title}</h3>
            <p className="home-practice">
              <strong>Practice:</strong> {app.practice}
            </p>
            <p className="home-features">
              <strong>Features:</strong> {app.features}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

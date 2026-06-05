import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/counter", label: "Counter" },
  { to: "/todo", label: "Todo" },
  { to: "/form", label: "Form" },
  { to: "/calculator", label: "Calculator" },
  { to: "/weather", label: "Weather" },
  { to: "/notes", label: "Notes" },
  { to: "/expenses", label: "Expenses" },
  { to: "/movies", label: "Movies" },
  { to: "/crud", label: "CRUD" },
];

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">React Practice Apps</h1>
        <nav className="app-nav">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Counter from "./pages/Counter.jsx";
import TodoList from "./pages/TodoList.jsx";
import UserForm from "./pages/UserForm.jsx";
import Calculator from "./pages/Calculator.jsx";
import WeatherApp from "./pages/WeatherApp.jsx";
import CrudApp from "./pages/CrudApp.jsx";
import NotesApp from "./pages/NotesApp.jsx";
import ExpenseTracker from "./pages/ExpenseTracker.jsx";
import MovieSearch from "./pages/MovieSearch.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="todo" element={<TodoList />} />
        <Route path="form" element={<UserForm />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="weather" element={<WeatherApp />} />
        <Route path="notes" element={<NotesApp />} />
        <Route path="expenses" element={<ExpenseTracker />} />
        <Route path="movies" element={<MovieSearch />} />
        <Route path="crud" element={<CrudApp />} />
      </Route>
    </Routes>
  );
}

export default App;

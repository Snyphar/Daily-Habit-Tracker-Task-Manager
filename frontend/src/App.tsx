import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import DailyHabit from "./components/DailyHabit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import PrivateRoute from "./PrivateRoutes";
import TaskTracker from "./components/TaskTracker";

function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard Page</h2>
      <p>Welcome to the Dashboard</p>
    </div>
  );
}

function Analytics() {
  return (
    <div className="container mt-4">
      <h2>Analytics Page</h2>
      <p>Habit analytics and reports</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar /> {/* Always visible */}
      {/* Routes */}
      <Routes>
        {/* Protected route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DailyHabit />
            </PrivateRoute>
          }
        />
        <Route path="/tasks" element={<TaskTracker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;

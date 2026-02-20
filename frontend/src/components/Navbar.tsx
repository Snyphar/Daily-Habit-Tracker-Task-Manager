import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");

    if (token && storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setEmail(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Habit Tracker
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/habits">
                Daily Habit
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Task Tracker
              </Link>
            </li>
          </ul>

          {email ? (
            <div className="d-flex align-items-center gap-3">
              <span className="fw-bold text-primary">{email}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

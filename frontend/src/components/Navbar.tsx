import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { email, logout } = useAuth();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Habit Tracker
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {email && (
              <>
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
              </>
            )}
          </ul>

          {email ? (
            <div className="d-flex align-items-center gap-3">
              <span className="fw-semibold text-primary">{email}</span>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link className="btn btn-outline-primary btn-sm" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

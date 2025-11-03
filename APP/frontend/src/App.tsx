import { Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Protected from "./Protected";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Acasă</Link>
        <Link to="/wishlist">Wishlist</Link>
        <span style={{ marginLeft: "auto" }}>
          {localStorage.getItem("token") ? (
            <button
              className="btn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          ) : (
            <Link className="btn" to="/login">Login</Link>
          )}
        </span>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/wishlist"
            element={
              <Protected>
                <Wishlist />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

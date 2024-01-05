import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import "./header.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userSlice.user);
  const [showOverlay, setShowOverlay] = useState(false);

  function navToHome() {
    navigate('/');
  }

  function logoutUser() {
    dispatch(logout());
    navToHome();
  }

  function toggleOverlay() {
    setShowOverlay(!showOverlay)
  }

  return (
    <header className="header">
      <nav>
        <span
          className="hamburger"
          onClick={toggleOverlay}
        >
          &#9776;
        </span>
      </nav>
      <div
        className={`overlay ${showOverlay ? "show" : ""}`}
        onClick={toggleOverlay}
      >
        <div className="overlay-content">
          <Link to={"/"}>Home</Link>
          {user === null ? (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signIn">Sign In</Link>
            </>
          ) : (
            <>
              <Link to={`/${user.id}/finance`}>Expenses</Link>
              <Link to={`/${user.id}/charts`}>Charts</Link>
              <Link to={"/"} onClick={logoutUser}>Log Out</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

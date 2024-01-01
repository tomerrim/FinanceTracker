import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import Button from "../Button";
import "./header.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.userSlice.user);

  function navToSignIn() {
    navigate("/signIn")
  }

  function navToSignUp() {
    navigate('/signUp')
  }

  function navToHome() {
    navigate('/');
  }

  function logoutUser() {
    dispatch(logout());
    navToHome();
  }

  return (
    <header className="header">
      <nav>
        <Button onClick={navToHome}>Home</Button>
        <div className="wrapper">
          {user ? (
            <>
              <Link to={`/${user.id}/finance`} className="item">Finance</Link>
              <Link to={`/${user.id}/charts`} className="item">Charts</Link>  
              {/* add charts later */}
            </>
            ) : <>Welcome to Finance tracker</>}
        </div>
        <div className="auth">
          {user === null ? (
            <>
              <Button onClick={navToSignUp}>Sign Up</Button>
              <Button onClick={navToSignIn}>Sign In</Button>
            </>
          ) : (
            <>
              <span>Hello, {user?.name}</span>
              <Button onClick={logoutUser}>Log Out</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();

  function navToSignIn() {
    navigate("/signIn")
  }

  function navToSignUp() {
    navigate('/signUp')
  }

  return (
    <header className="header">
      <nav>
        <div className="wrapper">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
        </div>
        <div className="auth">
          <Button onClick={navToSignIn}>Sign In</Button>
          <Button onClick={navToSignUp}>Sign Up</Button>
        </div>
      </nav>
    </header>
  );
}

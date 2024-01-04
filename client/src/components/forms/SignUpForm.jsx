import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs";
import Button from "../Button";
import { createUser } from "../../store/signUpSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    dispatch(createUser({ name, email, password }));
    navigate("/signIn");
  }

  return (
    <form onSubmit={submit} method="POST">
      <Input placeholder="Name" name="name" />
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit" className="btn">
        Sign Up
      </Button>
    </form>
  );
}

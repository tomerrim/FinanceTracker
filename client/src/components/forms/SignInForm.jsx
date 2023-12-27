import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs";
import Button from "../Button";
import { fetchUser } from "../../store/userSlice";

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await dispatch(fetchUser({ email, password }));
      console.log(response)
      navigate(`/${response.payload.user_id}/finance`);
      // if (response && response.user_id) {
      // }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <form onSubmit={submit} method="POST">
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit" className="btn">
        Sign In
      </Button>
    </form>
  );
}

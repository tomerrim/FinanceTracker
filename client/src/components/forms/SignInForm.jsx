import Input from "../Inputs";
import Button from "../Button";

export default function SignInForm() {
  async function submit(e) {
    e.preventDefault();
    console.log("Submit");
  }

  return (
    <form onSubmit={submit}>
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit" className="btn">
        Sign In
      </Button>
    </form>
  );
}

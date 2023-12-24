import Input from "../Inputs";
import Button from "../Button";

export default function SignUpForm() {
  async function submit(e) {
    e.preventDefault();
    console.log("Submit");
  }

  return (
    <form onSubmit={submit}>
      <Input placeholder="Name" name="name" />
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit" className="btn">
        Sign Up
      </Button>
    </form>
  );
}

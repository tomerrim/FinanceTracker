import { Link } from "react-router-dom";
import "./home.css";

export default function HomePage() {
    return (
      <main>
        <h1>Finance Tracker Home Page</h1>
        <Link to={"/addFinance"} className="link">Add New Finance</Link>
      </main>
    );
}
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

Chart.register(CategoryScale);

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

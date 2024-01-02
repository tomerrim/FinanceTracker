import { useSelector } from "react-redux";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";
import "./page.css";

export default function UserCharts() {
  const payments = useSelector((state) => state.userSlice.payments);
  return (
    <>
      <h2>Expense Charts</h2>
      <div className="rowChart">
        <LineChart payments={payments}/>
      </div>
      <div className="rowChart">
        <BarChart payments={payments} />
        <PieChart payments={payments}/>
      </div>
    </>
  );
}

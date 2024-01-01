import { Bar } from "react-chartjs-2";

export default function BarChart({ data }) {
    console.log("bar chart data:", data);
  return (
    <div className="barChart">
      <Bar data={data}/>
    </div>
  );
}

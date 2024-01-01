import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import BarChart from "../../components/Charts/BarChart";
//import { prepareChartData } from "../../Lib/utils";
import { Bar, Doughnut } from "react-chartjs-2";
import "./page.css";
import LineChart from "../../components/Charts/LineChart";

export default function UserCharts() {
  const payments = useSelector((state) => state.userSlice.payments);
  const [chartData, setChartData] = useState({});

  // useEffect(() => {
  //     const data = prepareChartData(payments);
  //     console.log("user chart data: ", data);
  //     setChartData(data);
  // }, [payments])

  useEffect(() => {
    function prepareChartData() {
      const categories = {};
      payments.forEach((payment) => {
        if (!categories[payment.category]) {
          categories[payment.category] = parseFloat(payment.money);
        } else {
          categories[payment.category] += parseFloat(payment.money);
        }
      });

      const categoryLabels = Object.keys(categories);
      const categoryValues = Object.values(categories);

      return {
        labels: categoryLabels,
        datasets: [
          {
            label: "Expenses by Category",
            data: categoryValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    const data = prepareChartData();
    setChartData(data);
  }, [payments]);

  return (
    <>
      <h2>Expense Charts</h2>
      <div className="rowChart">
        <LineChart/>
      </div>
      <div className="rowChart">
        <div className="chart bar">
          {chartData.labels && chartData.datasets && <Bar data={chartData} />}
        </div>
        <div className="chart pie">
          {chartData.labels && chartData.datasets && (
            <Doughnut data={chartData} />
          )}
        </div>
      </div>
    </>
  );
}

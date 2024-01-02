import { Bar } from "react-chartjs-2";
import { prepareBarData } from "../../Lib/utils";

export default function BarChart({ payments }) {
  const data = prepareBarData(payments);
  return (
    <>
      {data.labels && data.datasets && (
        <div className="chart bar">
          <Bar data={data} />
        </div>
      )}
    </>
  );
}

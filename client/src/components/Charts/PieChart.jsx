import { Doughnut } from "react-chartjs-2";
import { preparePieData } from "../../Lib/utils";

export default function PieChart({ payments }) {
  const data = preparePieData(payments);
  return (
    <>
      {data.labels && data.datasets && (
        <div className="chart pie">
          <Doughnut data={data} />
        </div>
      )}
    </>
  );
}

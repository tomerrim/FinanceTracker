import { Doughnut } from "react-chartjs-2";
import { preparePieData } from "../../Lib/utils";
import { Suspense } from "react";
import PieChartSkeleton from "../Skeletons/PieChartSkeleton";

export default function PieChart({ payments }) {
  const data = preparePieData(payments);
  return (
    <Suspense fallback={<PieChartSkeleton/>}>
      {data.labels && data.datasets && (
        <div className="chart pie">
          <Doughnut data={data} />
        </div>
      )}
    </Suspense>
  );
}

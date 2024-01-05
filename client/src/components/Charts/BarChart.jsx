import { Bar } from "react-chartjs-2";
import { prepareBarData } from "../../Lib/utils";
import { Suspense } from "react";
import BarChartSkeleton from "../Skeletons/BarChartSkeleton";

export default function BarChart({ payments }) {
  const data = prepareBarData(payments);
  return (
    <Suspense fallback={<BarChartSkeleton/>}>
      {data.labels && data.datasets && (
        <div className="chart bar">
          <Bar data={data} />
        </div>
      )}
    </Suspense>
  );
}

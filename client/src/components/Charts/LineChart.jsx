import { Line } from "react-chartjs-2";
import { prepareLineData } from "../../Lib/utils";

export default function LineChart({ payments }) {
    const data = prepareLineData(payments);
    
    const lineChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    }

    return (
        <>
            {data.labels && data.datasets && (
                <div className="chart lineChart">
                    <Line data={data} options={lineChartOptions}/>
                </div>
            )}
        </>
    )
}
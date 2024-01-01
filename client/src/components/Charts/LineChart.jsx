import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function LineChart() {
    const payments = useSelector((state) => state.userSlice.payments);
    const [lineData, setLineData] = useState({});

    useEffect(() => {
        function prepareLineData() {
            const expensesByDate = {};
            payments.forEach(payment => {
                const date = payment.date;
                if (!expensesByDate[date]) {
                    expensesByDate[date] = parseFloat(payment.money);
                } else {
                    expensesByDate[date] += parseFloat(payment.money);
                }
            });
            const dateLabels = Object.keys(expensesByDate);
            const expenseAmounts = Object.values(expensesByDate);

            return {
                labels: dateLabels,
                datasets: [
                    {
                        label: "Expenses Over Time",
                        data: expenseAmounts,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                        borderWidth: 2
                    }
                ]
            }
        }
        const data = prepareLineData();
        setLineData(data);
    }, [payments]);

    const lineChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    }

    return (
        <>
            {lineData.labels && lineData.datasets && (
                <div className="chart lineChart">
                    <Line data={lineData} options={lineChartOptions}/>
                </div>
            )}
        </>
    )
}
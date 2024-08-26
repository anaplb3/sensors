import { Bar } from 'react-chartjs-2'

export const BarChart = ({chartData, timeLimit}) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: "Average value for each equipment in the last " + timeLimit
                    },
                    legend: {
                    display: false
                    }
                }
                }}
            />
    </div>
    );
}
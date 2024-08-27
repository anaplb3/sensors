import { Bar } from 'react-chartjs-2'

export const BarChart = ({chartData, timeLimit}) => {
    return (
        <div className="chart-container">
            <Bar
                data={chartData}
                options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Valor médio de cada equipamento no período de " + timeLimit
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
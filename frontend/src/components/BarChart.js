import { Bar } from 'react-chartjs-2'

export const BarChart = ({chartData, timeLimit}) => {
    return (
        <div className="chart-container" 
        style={{position: 'relative', height: '40vh', width: '80vw'}}>
            <Bar
                data={chartData}
                options={
                    {
                        plugins: {
                            title: {
                                display: true,
                                text: "Valor médio de cada equipamento no período de " + timeLimit
                            },
                            legend: {
                                display: false
                            }
                        },
                        maintainAspectRatio: false
                    }
                }
            />
    </div>
    );
}
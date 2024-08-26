import './App.css';
import { Chart, registerables } from 'chart.js';
import { useState } from 'react';
import { BarChart } from './BarChart';

Chart.register(...registerables);

function App() {
  const [sensorsData, setSensorsData] = useState({
      labels: [],
      datasets: [
        {
          label: "Average value for each equipment",
          data: [],
          backgroundColor: [],
          borderColor: "black",
          borderWidth: 2
        }
      ]
    }
  );
  const [timeLimit, setTimeLimit] = useState("1 month");

  
  const getInfo = async (query) => {
    await fetch(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/sensores/averageValues?${query}`)
          .then((response) => response.json())
          .then((data) => {
            setSensorsData(transformData(data));
          })
          .catch((err) => {
            console.log(err.message)
          });
  };

  const transformData = (response) => {
    const data = {
      labels: response.map((item) => item.equipmentId),
      datasets: [
        {
          label: "Average value",
          data: response.map((item) => item.avgValue),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "black",
          borderWidth: 2,
        }
      ]
    };
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    var index = e.target.timeLimit.selectedIndex;
    setTimeLimit(e.target.timeLimit[index].text)
    const query = new URLSearchParams(formData).toString()
    
    getInfo(query);
  }

  return (
    <div className='App'>
      <form method='get' onSubmit={handleSubmit}>
        <label> 
          Select a timebox: 
          <select name="timeLimit">
            <option value={"24h"}> 24 hours </option>
            <option value={"48h"}> 48 hours </option>
            <option value={"1w"}> 1 week </option>
            <option value={"1m"}> 1 month </option>
          </select>
        </label>

        <hr />
        <button type='submit'> Submit </button>
      </form>

      <BarChart chartData={sensorsData} timeLimit={timeLimit}/>
      
    </div>
  );

}

export default App;

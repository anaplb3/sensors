import { Chart, registerables } from 'chart.js';
import { useState } from 'react';
import { BarChart } from './components/BarChart';
import SelectComponent from './components/SelectComponent';
import { Tab, Tabs, Container, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FormComponent from './components/FormComponent';
import FormCsvComponent from './components/FormCsvComponent';
import { addSensorsInfoFromCsv, getSensorsInfo, addSensorsInfo } from './service/api';

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
  const [timeLimit, setTimeLimit] = useState("1 mês");
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  const handleGetInfo = async (timeLimitValue, timeLimitText) => {
    setTimeLimit(timeLimitText);
    getSensorsInfo(timeLimitValue, (data) => setSensorsData(transformData(data)), () => setShowFailAlert(true));
  };

  const handleAddInfo = async (equipmentId, timestamp, value) => {
    addSensorsInfo(equipmentId, timestamp, value, () => setShowSuccessAlert(true), () => setShowFailAlert(true))
  };

  const handleAddInfoFromCsv = async (csvFile) => {
    addSensorsInfoFromCsv(csvFile, () => setShowSuccessAlert(true), () => setShowFailAlert(true));
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

  return (
    <Container>
      <Tabs
        id="home-tabs"
        defaultActiveKey={"get-data"}
        className='mb-3'
        onSelect={() => {
          setShowSuccessAlert(false);
          setShowFailAlert(false);
        }}
      >
        <Tab eventKey={"get-data"} title={"Média dos valores"}>
          <div>
            <SelectComponent getInfo={handleGetInfo}/>
            <BarChart chartData={sensorsData} timeLimit={timeLimit}/>
          </div>
          

        </Tab>
        <Tab eventKey={"upload-data"} title={"Entre com os dados"}>
  
          <FormComponent addInfo={handleAddInfo}/>

        </Tab>
        <Tab eventKey={"upload-csv"} title={"Entre com o CSV"}>
          
          <FormCsvComponent addDataFromCSV={handleAddInfoFromCsv}/>

        </Tab>
      </Tabs>

      <Alert
        show={showSucessAlert}
        variant='success'
        className="w-25 mt-3 ml-3"
        onClose={() => setShowSuccessAlert(false)}
        dismissible
        style={{float: 'inline-end'}}
      >
          Tudo certo!
      </Alert>

      <Alert
        show={showFailAlert}
        variant='danger'
        className="w-25 mt-3 ml-3"
        onClose={() => setShowFailAlert(false)}
        dismissible
        style={{float: 'inline-end'}}
      >
          Não foi possível enviar os dados.
      </Alert>
    </Container>
  );

}

export default App;

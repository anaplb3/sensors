import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_SERVICE_URL;

const apiService = axios.create({
    baseURL: BASE_URL,
});

export const getSensorsInfo = async (timeLimitValue, successCallback, failCallback) => {
    apiService.get(`/sensors/averageValues?timeLimit=${timeLimitValue}`)
        .then((response) => {
            console.log("funcionou");
            successCallback(response.data);
        } )
        .catch((err) => {
            console.log("deu errado: " + err);
            failCallback();
        });
  };

export const addSensorsInfo = async(equipmentId, timestamp, value, successCallback, failCallback) => {
    apiService.post(`${BASE_URL}/sensors/`, {
        equipmentId: equipmentId, 
        timestamp: timestamp, 
        value: value
    })
        .then((response) => { successCallback(); })
        .catch((err) => {
            console.log("erro: " + err);
            failCallback();
        });
  };

  export const addSensorsInfoFromCsv = async(csvFile, successCallback, failCallback) => {
    const formData = new FormData();
    formData.append('file', csvFile);

    apiService.post(`/sensors/csv`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => { successCallback(); })
        .catch((err) => {
            console.log("erro: " + err);
            failCallback();
        })   
  };

import axios from 'axios';

export default async payload => {
  const url = 'https://reportwebah.azurewebsites.net/api/IDReportService/PutReportRequest';
  const response = axios
    .put(url, payload)
    .then(response => response)
    .catch(error => {
      console.log(error);
    });
  return response;
};

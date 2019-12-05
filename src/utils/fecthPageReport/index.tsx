import axios from 'axios';

export default async payload => {
  const url = 'https://reportwebah.azurewebsites.net/api/IDReportService/PutReportRequest';
  axios
    .put(url, payload)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

import L from 'leaflet';
const hereCodes = {
  appCode: 'jXl7h7zBS__4y6yMbBedZQ',
  appId: 'hjQP6zOiw36wfQmo5z73',
};
export default {
  road: L.tileLayer(
    `https://{s}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=${hereCodes.appId}&app_code=${hereCodes.appCode}`,
    {
      displayText: 'road',
      attribution: 'Here.com',
      subdomains: ['1', '2', '3', '4'],
    },
  ),
  sattelite: L.tileLayer(
    `https://{s}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=${hereCodes.appId}&app_code=${hereCodes.appCode}`,
    {
      displayText: 'sattelite',
      attribution: 'Here.com',
      subdomains: ['1', '2', '3', '4'],
      minZoom: 4,
    },
  ),
  hybrid: L.tileLayer(
    `https://{s}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?app_id=${hereCodes.appId}&app_code=${hereCodes.appCode}`,
    {
      displayText: 'hybrid',
      attribution: 'Here.com',
      subdomains: ['1', '2', '3', '4'],
      minZoom: 4,
    },
  ),
};

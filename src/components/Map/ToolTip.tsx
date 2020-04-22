import L from 'leaflet';
import _ from 'lodash';
const defaultTooltipOptions: any = {
  sticky: true,
  opacity: 0.9,
  direction: 'right',
  offset: [20, 30],
  permanent: false,
  className: 'l-tooltip',
};

export default (data, options?) => {
  let htmlElem: string = `<div class="polyToolTip"><h1>${data.areaName}</h1>`;
  if (!_.isEmpty(data.infoBox)) {
    const { displayText } = data.infoBox;
    htmlElem += '<br />';
    displayText.forEach(element => {
      htmlElem += `<span>${element}</span><br />`;
    });
  }
  htmlElem += '</div>';
  return L.tooltip(options || defaultTooltipOptions).setContent(htmlElem);
};

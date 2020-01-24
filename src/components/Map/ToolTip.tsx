import L from 'leaflet';
const defaultTooltipOptions: any = {
  sticky: true,
  opacity: 0.8,
  direction: 'right',
  offset: [20, 30],
  permanent: false,
  className: 'l-tooltip',
};

export default (data, options?) => {
  let htmlElem: string = `<div class="polyToolTip"><h1>${data}</h1></div>`;
  // for (var key in data.displayText) {
  //   if (data.displayText.hasOwnProperty(key)) {
  //     htmlElem += `${key}: ${data.displayText[key]}<br />`;
  //   }
  // }
  return L.tooltip(options || defaultTooltipOptions).setContent(htmlElem);
};

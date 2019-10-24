// #region imports
import * as Highcharts from 'highcharts';
import data from 'highcharts/modules/export-data';

import * as _ from 'lodash';
import * as React from 'react';
import { detectIE } from '../Utils';
import { ExportDropdown, Actions, EntityContainer } from '../Actions';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
// import { RenderContext, Image as WordImage } from "../../../lib/docx-render.jsx"

// #endregion

const HighChartContainer = styled.div`
  padding-top: 20px;
`;

class HighChart extends React.Component<IChartProps, IChartState> {
  public exportScaleOutputs: any = {
    hi: 2,
    lo: 0.881123
  };

  constructor(props: any, context: any) {
    super(props, context);
    if (this.context === 'word') return;

    const { config, highchartOptions, chartContainerID } = this.props;

    // Highcharts.setOptions({
    //   lang: {
    //     decimalPoint: '.',
    //     thousandsSep: ',',
    //     drillUpText: `◁ back`
    //   }
    // });
  }

  componentDidMount(): void {
    const { config, highchartOptions, chartContainerID } = this.props;
    Highcharts.chart(
      chartContainerID,
      config({ ...highchartOptions, oneToOne: true })
    );
  }

  componentWillUnmount(): void {
    //this.chart.destroy();
  }

  // public highchartsSVGtoImage = (): Promise<ExportImageData> => {
  //   return new Promise(resolve => {
  //     const { config, highchartOptions } = this.props;

  //     Highcharts.setOptions({
  //       lang: {
  //         decimalPoint: '.',
  //         thousandsSep: ','
  //       }
  //     });

  //     const chart = new Highcharts.Chart(
  //       document.createElement('div'),
  //       config([highchartOptions])
  //     );

  //     // Hardcoded 2:1 aspect ratio; it's close enough
  //     const a4pageWidthInDWIPUnits = 595.3;
  //     const width = a4pageWidthInDWIPUnits;
  //     const height = width / 2;

  //     // Get the cart's SVG code
  //     const svg = chart.getSVG({
  //       exporting: {
  //         sourceWidth: width,
  //         sourceHeight: height
  //       }
  //     });

  //     // Create a canvas
  //     const canvas = document.createElement('canvas');
  //     canvas.height = height;
  //     canvas.width = width;

  //     // Create an image and draw the SVG onto the canvas
  //     const image = new Image();
  //     image.onload = function() {
  //       canvas.getContext('2d').drawImage(image, 0, 0, width, height);
  //       canvas.toBlob(
  //         imageData => resolve({ imageData, width, height }),
  //         'image/png',
  //         4
  //       );
  //     };
  //     image.src =
  //       'data:image/svg+xml;base64,' +
  //       window.btoa(unescape(encodeURIComponent(svg)));
  //   });
  // };

  // renderWord() {
  //   return <WordImage promise={this.highchartsSVGtoImage()} />;
  // }

  render(): any {
    const { exportOptions, chartContainerID } = this.props;

    // if (this.context === 'word') return this.renderWord();

    return (
      <EntityContainer>
        {exportOptions && exportOptions.enabled && (
          <Actions>
            <ExportDropdown exportOptions={exportOptions} />
          </Actions>
        )}
        <HighChartContainer id={chartContainerID} />
      </EntityContainer>
    );
  }
}

export default HighChart;

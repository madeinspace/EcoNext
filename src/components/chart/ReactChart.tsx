import React, { useState, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Actions, ExportDropdown, ChartContainer } from '../Actions';
import { Loader } from '../ui/loader';
import { ChartDefault } from './configs/Chart.config';
import { exportOptions } from './configs/ExportOptions';
import { ChartFooter } from './ChartFooter';

const ReactChart = props => {
  const {
    height,
    enableExport = true,
    options: {
      highchartOptions,
      reactChartOptions: { footer },
    },
  } = props;
  const chartRef: any = useRef(null);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    setisLoaded(true);
  });

  const handleExport = item => {
    switch (item.type) {
      case 'application/pdf':
        chartRef.current.chart.exportChart({ type: item.type });
        break;
      case 'csv':
        chartRef.current.chart.downloadCSV();
        break;
      default:
        chartRef.current.chart.exportChartLocal({ type: item.type });
        break;
    }
  };

  return (
    <ChartContainer>
      <Loader height={height} loaded={isLoaded} />
      {isLoaded && enableExport && (
        <Actions>
          <ExportDropdown exportOptions={exportOptions} handleExport={handleExport} />
        </Actions>
      )}
      {isLoaded && <HighchartsReact highcharts={Highcharts} options={ChartDefault(highchartOptions)} ref={chartRef} />}
      {footer && <ChartFooter dataSource={footer.dataSource} />}
    </ChartContainer>
  );
};

export default ReactChart;

import React, { useState, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighChartsMore from 'highcharts/highcharts-more';
import { Actions, ExportDropdown, ChartContainer } from '../Actions';
import { Loader } from '../ui/loader';
import { ChartDefault } from './configs/Chart.config';
import { exportOptions } from './configs/ExportOptions';
import { ChartFooter } from './ChartFooter';
import exporting from 'highcharts/modules/exporting';
import offline from 'highcharts/modules/offline-exporting';
import drilldown from 'highcharts/modules/drilldown';
import dumbbell from 'highcharts/modules/dumbbell';
import data from 'highcharts/modules/export-data';

const ReactChart = props => {
  const {
    height,
    enableExport = true,
    options: {
      highchartOptions,
      reactChartOptions,
      reactChartOptions: { footer = null },
    },
  } = props;
  const chartRef: any = useRef(null);
  const [isLoaded, setisLoaded] = useState(false);
  const options = ChartDefault({ ...highchartOptions, source: reactChartOptions.footer.rawDataSource });

  useEffect(() => {
    setisLoaded(true);
  });

  if (typeof Highcharts === 'object') {
    HighChartsMore(Highcharts);
    exporting(Highcharts);
    offline(Highcharts);
    data(Highcharts);
    drilldown(Highcharts);
    dumbbell(Highcharts);
  }

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
      {isLoaded && <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />}
      {footer && <ChartFooter dataSource={footer.dataSource} />}
    </ChartContainer>
  );
};

export default ReactChart;

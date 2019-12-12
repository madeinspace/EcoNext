import * as React from 'react';
import HighChart from './Highchart';
import { ChartDefault } from './configs/Chart.config';
import { exportOptions } from './configs/ExportOptions';

export class ChartFactory {
  public static getChart(template: string, data: any): any {
    data.highchartOptions.source = data.rawDataSource;
    const chartTenmplate = template || 'Standard';
    switch (chartTenmplate) {
      case 'Standard':
        return <HighChart config={ChartDefault} {...{ ...data, exportOptions }} />;

      default:
        throw new Error(`Could not instantiate chart, no template was provided in chartBuilder (ie: Standard / Pie)`);
    }
  }
}

// #region imports
import * as Highcharts from 'highcharts';
import data from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';
import offline from 'highcharts/modules/offline-exporting';
import drilldown from 'highcharts/modules/drilldown';
import * as _ from 'lodash';
import * as React from 'react';
import { detectIE } from '../../utils/';
import { ExportDropdown, Actions } from '../Actions';
import styled from 'styled-components';
import { IChartProps, IChartState } from './Interfaces.chart';
import { Loader } from '../ui/loader';
// #endregion

const HighChartContainer = styled.div`
  padding: 10px 0;
  visibility: ${props => (props.loaded ? 'visible' : 'hidden')};
`;

export const EntityContainer = styled.div`
  position: relative;
`;

class HighChart extends React.Component<IChartProps, IChartState> {
  public exportScaleOutputs: any = {
    hi: 2,
    lo: 0.881123,
  };

  public chart;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = { isLoaded: false };
  }

  componentDidMount(): void {
    const { config, highchartOptions, chartContainerID } = this.props;
    this.setState({ isLoaded: true });

    exporting(Highcharts);
    offline(Highcharts);
    data(Highcharts);
    if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
      drilldown(Highcharts);
    }
    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ',',
        drillUpText: '◁ Back',
      },
    });

    this.chart = Highcharts.chart(chartContainerID, config({ ...highchartOptions, oneToOne: true }));
  }

  componentWillUnmount(): void {
    this.chart.destroy();
  }

  protected handleExport = item => {
    const useHighchartServer: boolean = detectIE() > 0 && detectIE() <= 11 ? true : false;
    const exportRes: any = this.exportScaleOutputs[item.res];
    // pDF does not support exporting with images and needs fall back to the export server.

    if (useHighchartServer) {
      this.chart.exportChart({ type: item.type });
      return;
    }

    switch (item.type) {
      case 'application/pdf':
        this.chart.exportChart({ type: item.type });
        break;
      case 'csv':
        this.chart.downloadCSV();
        break;
      default:
        this.chart.exportChartLocal({ type: item.type, scale: exportRes });
        break;
    }
  };

  render(): any {
    const { exportOptions, chartContainerID, enableExport = true } = this.props;
    const { isLoaded } = this.state;

    return (
      <EntityContainer>
        {enableExport && exportOptions && exportOptions.enabled && isLoaded && (
          <Actions>
            <ExportDropdown exportOptions={exportOptions} handleExport={this.handleExport} />
          </Actions>
        )}
        <Loader loaded={isLoaded} />
        <HighChartContainer id={chartContainerID} loaded={isLoaded} />
      </EntityContainer>
    );
  }
}

export default HighChart;

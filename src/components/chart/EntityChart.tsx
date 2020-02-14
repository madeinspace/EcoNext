import * as React from 'react';
import { ChartFactory } from './ChartFactory';
import { ChartFooter } from './ChartFooter';
import styled from 'styled-components';
// import { RenderContext } from "../../../lib/word-renderer/word-render"

const ChartWrapper = styled.div``;

const EntityChart: React.SFC<any> = props => {
  const {
    data,
    data: { enableExport, chartTemplate, dataSource, logoUrl },
  } = props;
  const Chart = ChartFactory.getChart(chartTemplate, data);

  return (
    <ChartWrapper className="e-shad">
      {Chart}
      {dataSource && <ChartFooter dataSource={dataSource} logoUrl={logoUrl} />}
    </ChartWrapper>
  );
};

export default EntityChart;

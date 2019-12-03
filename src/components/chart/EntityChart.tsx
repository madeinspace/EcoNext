import * as React from 'react';
import { ChartFactory } from './ChartFactory';
import { ChartFooter } from './ChartFooter';
import styled from 'styled-components';
// import { RenderContext } from "../../../lib/word-renderer/word-render"

const ChartWrapper = styled.div``;

const EntityChart: React.SFC<any> = props => {
  const {
    data,
    data: { chartTemplate, dataSource },
  } = props;
  const Chart = ChartFactory.getChart(chartTemplate, data);

  return (
    <ChartWrapper className="e-shad">
      {Chart}
      <ChartFooter dataSource={dataSource} />
    </ChartWrapper>
  );
};

export default EntityChart;

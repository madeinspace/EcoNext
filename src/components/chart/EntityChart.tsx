import * as React from 'react';
import { ChartFactory } from './ChartFactory';
import { ChartFooter } from './ChartFooter';
import styled from 'styled-components';
// import { RenderContext } from "../../../lib/word-renderer/word-render"

const ChartWrapper = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const EntityChart: React.SFC<any> = props => {
  const {
    data,
    data: { chartTemplate, dataSource },
  } = props;
  const Chart = ChartFactory.getChart(chartTemplate, data);

  return (
    <ChartWrapper className="entity">
      {Chart}
      <ChartFooter dataSource={dataSource} />
    </ChartWrapper>
  );
};

export default EntityChart;

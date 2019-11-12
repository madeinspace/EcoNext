import * as React from 'react';
import { ChartFactory } from './ChartFactory';
import { ChartFooter } from './ChartFooter';
// import { RenderContext } from "../../../lib/word-renderer/word-render"

const EntityChart: React.SFC<any> = props => {
  const {
    data,
    data: { chartTemplate, dataSource }
  } = props;
  const Chart = ChartFactory.getChart(chartTemplate, data);

  return (
    <div className={`entity-chart ${chartTemplate}`}>
      {Chart}
      <ChartFooter dataSource={dataSource} />
    </div>
  );
};

export default EntityChart;

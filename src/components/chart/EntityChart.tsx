import * as React from 'react';
import { ChartFactory } from './ChartFactory';
import { ChartFooter } from './ChartFooter';
// import { RenderContext } from "../../../lib/word-renderer/word-render"

const EntityChart: React.SFC<EntityChartProps> = props => {
  const {
    data,
    data: { chartTemplate, dataSource, cssClass }
  } = props;
  const Chart = ChartFactory.getChart(chartTemplate, data);

  return (
    <div className={'entity-chart ' + cssClass || 'standard'}>
      {Chart}
      <ChartFooter dataSource={dataSource} />
    </div>
  );
};

export default EntityChart;

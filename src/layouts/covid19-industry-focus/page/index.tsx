// #region imports
import _ from 'lodash';
import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { LinkBuilder } from '../../../components/ui/links';
import { PageIntroFullWidth } from '../../../styles/MainContentStyles';
import { formatNumber, formatPercent } from '../../../utils';
import { ClientContext, PageContext } from '../../../utils/context';
import Disclaimers from '../../covid19/page/Disclaimers';
import IndustryMixChart from './charts/IndustryMixChart';
import QuarterlyForecastChart from './charts/QuarterlyForecastChart';
// #endregion

// #region template page
const CovidIndustryFocusPage = () => {
  const {
    filters: { Ind },
    entityData: { currentIndustry, currentIndicator, currentBenchmark },
    contentData: { industryData },
  } = useContext(PageContext);
  const { clientAlias, LongName } = useContext(ClientContext);

  const lookup = {
    1: 'Output_',
    2: 'VA_',
    3: 'JTW_',
    4: 'UR_',
  };

  const makeSerie = (suffix, bm = false) => {
    const serie = industryData.filter(({ WebID }) => WebID === 10).map(item => item[lookup[+Ind] + suffix]);
    const serieBM = industryData.filter(({ WebID }) => WebID != 10).map(item => item[lookup[+Ind] + suffix]);

    if (bm) {
      return [
        {
          name: `${LongName}`,
          data: serie,
        },
        {
          className: 'alt-bm-color',
          name: `${currentBenchmark}`,
          data: serieBM,
        },
      ];
    }
    return [
      {
        name: `${LongName}`,
        data: serie,
      },
    ];
  };
  const categories = industryData.filter(({ WebID }) => WebID === 10).map(({ Label }) => Label);

  const makeTooltip = (format = 'num', preffix = '') => {
    return function() {
      const formatted = format === 'num' ? `${formatNumber(this.y)}` : `${formatPercent(this.y)}`;
      return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${this.category}: ${formatted}${preffix}`;
    };
  };

  const actualChart = {
    chartTitle: `Quarterly ${currentIndicator} forecast - ${currentIndustry}${+Ind === 1 || +Ind === 2 ? '($M)' : ''}`,
    type: 'column',
    series: makeSerie('Actual'),
    categories,
    tooltip: makeTooltip(),
  };
  const changeChart = {
    chartTitle: `Quarterly change in ${currentIndicator} forecast - ${currentIndustry}${
      +Ind === 1 || +Ind === 2 ? '($M)' : ''
    }`,
    type: 'column',
    series: makeSerie('Change'),
    categories,
    tooltip: makeTooltip(),
  };
  const changePerChart = {
    chartTitle: `Quarterly change in ${currentIndicator} forecast - ${currentIndustry}(%)`,
    type: 'line',
    series: makeSerie('Change_Per', true),
    categories,
    tooltip: makeTooltip('per', '%'),
  };
  const indexChart = {
    chartTitle: `Quarterly Index of ${currentIndicator} forecast - ${currentIndustry} (Index, 100 = March Qtr 2020)`,
    type: 'line',
    series: makeSerie('Index', true),
    categories,
    tooltip: makeTooltip(),
    yAxis: { tickPositions: [65, 100, 135] },
  };

  return (
    <>
      {' '}
      <PageIntroFullWidth>
        <p>
          The COVID 19 pandemic and policy responses enacted to limit its spread have generated uncertainty about the
          future of local economies. This uncertainty has created difficulties in planning economic development
          responses at a local government level. In response, .id has developed a COVID-19 Economic Forecast Tool that
          estimates likely quarterly economic and industry impacts out to June 2022.
        </p>
        <p>
          The COVID-19 Extended quarterly industry forecast shows the likely transition pathways of an industry Pre and
          Post COVID-19. Charts in this page show the quarterly value, change (value and %) and index (100 = March
          Quarter 2020) for the Output, Value Added, Local Jobs and Employed Residents of industry, based on the 87
          industry subsectors and 19 main industry divisions in the ANZSIC classification.
        </p>
        <p>
          This tool should be viewed in conjunction with the{' '}
          {LinkBuilder(
            `https://economy.id.com.au/${clientAlias}/covid19-extended-forecasts`,
            'COVID-19 Extended forecast',
          )}{' '}
          section to see the impact of COVID-19 on the overall economy, and{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/unemployment`, 'unemployment')} and{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section to understand the
          impact of COVID-19
          {/* on the local labour force. To monitor the impact of COVID-19 on local businesses, see the Business Trends
          section. */}
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />
      <IndustryMixChart />
      <QuarterlyForecastChart data={actualChart} />
      <QuarterlyForecastChart data={changeChart} />
      <QuarterlyForecastChart data={changePerChart} />
      <QuarterlyForecastChart data={indexChart} />
      <Disclaimers />
    </>
  );
};
export default CovidIndustryFocusPage;
// #endregion

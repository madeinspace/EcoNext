// #region imports
import _ from 'lodash';
import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { PageIntroFullWidth, SubTitleAlt2, TopList } from '../../../styles/MainContentStyles';
import { ClientContext, PageContext } from '../../../utils/context';
import { SectionTitle } from '../../covid19/page/Styles';
import ActualChart from './charts/ActualChart';
import ChangeChart from './charts/ChangeChart';
import ChangePerChart from './charts/ChangePerChart';
import EconomicAndEmploymentForecastsChart from './charts/EconomicAndEmploymentForecastsChart';
import IndexChart from './charts/IndexChart';
import PostCovidImpactChart from './charts/PostCovidImpactChart';
import KeyInsights from './KeyInsights';
// #endregion

// #region template page
const CovidExtendedForecastsPage = () => {
  return (
    <>
      <PageIntroFullWidth>
        <p>
          The current COVID-19 pandemic and its effects bring an uncertainty about the future of economy and
          difficulties in planning and economic development at a local government level. In response, .id has developed
          a COVID-19 Economic Forecast Tool to show the quarterly economic and industry forecasts out to June 2022.
        </p>
        <p>
          This tool should be viewed in conjunction with Unemployment and JobSeeker section to understand the impact of
          COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the Business
          Trends section.{' '}
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />
      <ActualChart />
      <ChangeChart />
      <ChangePerChart />
      <IndexChart />

      {/* <SectionTitle>Headline Forecasts</SectionTitle>
      <KeyInsights /> */}

      {/* <SectionTitle>Economic and employment Forecasts</SectionTitle>
      <PostCovidImpactChart /> */}
    </>
  );
};
export default CovidExtendedForecastsPage;
// #endregion

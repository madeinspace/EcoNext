// #region imports
import _ from 'lodash';
import React from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { Lead, PageIntroFullWidth } from '../../../styles/MainContentStyles';
import Disclaimers from '../../covid19/page/Disclaimers';
import { SectionTitle } from '../../covid19/page/Styles';
import ActualChart from './charts/ActualChart';
import ChangeChart from './charts/ChangeChart';
import ChangePerChart from './charts/ChangePerChart';
import IndexChart from './charts/IndexChart';
// #endregion

// #region template page
const CovidExtendedForecastsPage = () => {
  return (
    <>
      <PageIntroFullWidth>
        <p>
          The COVID 19 pandemic and policy responses enacted to limit its spread have generated uncertainty about the
          future of local economies. This uncertainty has created difficulties in planning economic development
          responses at a local government level. In response, .id has developed a COVID-19 Economic Forecast Tool that
          estimates likely quarterly economic and industry impacts out to June 2022.
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
      <SectionTitle>Industry Forecasts</SectionTitle>
      <Lead>Industry Forecasts coming soon.</Lead>
      <Disclaimers />
    </>
  );
};
export default CovidExtendedForecastsPage;
// #endregion

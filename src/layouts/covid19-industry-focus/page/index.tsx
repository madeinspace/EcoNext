// #region imports
import _ from 'lodash';
import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { PageIntroFullWidth } from '../../../styles/MainContentStyles';
import { PageContext } from '../../../utils/context';
import Disclaimers from '../../covid19/page/Disclaimers';
import IndustryMixChart from './charts/IndustryMixChart';
// #endregion

// #region template page
const CovidIndustryFocusPage = () => {
  const {
    entityData: { currentBenchmark, currentIndicator, currentIndustry, currentStartYear, currentEndYear },
    contentData: { industryMixData },
  } = useContext(PageContext);
  console.log('industryMixData: ', industryMixData);
  return (
    <>
      {' '}
      <PageIntroFullWidth>
        <p>Industry focus text here</p>
        <p>
          This tool should be viewed in conjunction with Unemployment and JobSeeker section to understand the impact of
          COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the Business
          Trends section.{' '}
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />
      <IndustryMixChart />
      <Disclaimers />
    </>
  );
};
export default CovidIndustryFocusPage;
// #endregion

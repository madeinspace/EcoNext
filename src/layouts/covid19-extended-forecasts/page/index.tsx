// #region imports
import _ from 'lodash';
import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { PageIntroFullWidth, SubTitleAlt2, TopList } from '../../../styles/MainContentStyles';
import { ClientContext, PageContext } from '../../../utils/context';
import { SectionTitle } from '../../covid19/page/Styles';
import PostCovidImpactChart from './charts/PostCovidImpactChart';
// #endregion

// #region template page
const CovidExtendedForecastsPage = () => {
  const {
    contentData: { headlinesData },
  } = useContext(PageContext);
  console.log('headlinesData: ', headlinesData);
  return (
    <>
      <PageIntroFullWidth>
        <p>
          COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
          developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws
          on the economic forecast model developed by NIEIR and focuses on the impacts to September 2020.
        </p>
        <p>
          This tool should be viewed in conjunction with Unemployment and JobSeeker section to understand the impact of
          COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the Business
          Trends section.{' '}
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />

      <SectionTitle>Headline Forecasts</SectionTitle>

      <SubTitleAlt2>Key Insights</SubTitleAlt2>
      <TopList>
        <li>
          Sunshine Coast LGA GRP is forecast to fall by [##%] in the March Quarter 2020 and then fall by [##%] in the
          June Quarter 2020.
        </li>
        <li>
          In the September Quarter 2020 positive quarterly growth resumes at [##%], with the quarterly growth rate
          sustained into 2021.
        </li>
        <li>
          Forecast show that Sunshine Coast LGA won’t be back at 2019-Q4 level for at least 2 years with GRP [##%] lower
          than the peak in December 2019.
        </li>
      </TopList>

      <SectionTitle>Economic and employment Forecasts</SectionTitle>
      <PostCovidImpactChart />
    </>
  );
};
export default CovidExtendedForecastsPage;
// #endregion

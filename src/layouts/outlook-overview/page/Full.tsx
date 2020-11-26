// #region imports
import React, { useContext } from 'react';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../../utils/context';
import { formatPercent, formatNumber, absSort, Top } from '../../../utils';
import { _SubTitle, PageIntroFullWidth, TopList } from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { SectionTitle, TilesGrid, Tile, Title, NumberValue, Footer, TilesGrid2Col } from './Styles';
import Disclaimers from './Disclaimers';
// #region imports
import { PageIntro, SourceBubble, ItemWrapper, ShadowWrapper } from '../../../styles/MainContentStyles';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import { formatChangeInt, idlogo } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import RelatedPagesCTA from '../../../components/RelatedPages';
import useDropdown from '../../../utils/hooks/useDropdown';
import { Headline as StyledHeadline } from '../../../styles/MainContentStyles';
import ReactChart from '../../../components/chart/ReactChart';
// #endregion

// #region template page
const FullContent = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    filters,
    entityData: { currentAreaName, prefixedAreaName },
    contentData: { headlineData, topThreeData, forecastSummaryData, vulnerableJobsData },
  } = useContext(PageContext);
  console.log('forecastSummaryData, vulnerableJobsData: ', forecastSummaryData, vulnerableJobsData);

  const LGA = headlineData.filter(({ WebID }) => WebID != 40);
  const BM = headlineData.filter(({ WebID }) => WebID === 40);
  const currentBenchmarkName = BM[0].GeoName;

  const GRPLGA = LGA.find(item => item.Measure === 'GRP');
  const GRPBM = BM.find(item => item.Measure === 'GRP');

  const JOBSLGA = LGA.find(item => item.Measure === 'Local_Jobs');
  const URJOBSLGA = LGA.find(item => item.Measure === 'UR_Jobs');
  const GRPLGAAdj = Math.sign(GRPLGA.QtrChgPer) === -1 ? 'lower' : 'higher';
  const GRPLGATextAlt = Math.sign(GRPLGA.QtrChgPer) === -1 ? 'fall' : 'increase';
  const GRPComparisonTextPos = `This increase is in contrast to that experienced by the state as a whole.`;
  const GRPCOMPText = GRPLGA.QtrChgPer > GRPBM.QtrChgPer ? 'less' : 'greater ';
  const GRPComparisonTextNeg = `This fall is ${GRPCOMPText} than that experienced by the state as a whole.`;
  const GRPCompTextFinal = GRPLGATextAlt === 'fall' ? GRPComparisonTextNeg : GRPComparisonTextPos;
  const JOBSLGAText = Math.sign(JOBSLGA.ExJKCompPer) === -1 ? 'fall' : 'grow';
  const JOBSLGATextAlt = Math.sign(JOBSLGA.ExJKCompPer) === -1 ? 'fall' : 'growth';
  const URJOBSIMPACTText = Math.abs(URJOBSLGA.ExJKCompPer) > Math.abs(JOBSLGA.ExJKCompPer) ? 'higher' : 'lower';
  const LocalJobsImpactNJK = topThreeData.filter(
    ({ NJKQtrComp, WebID, Measure }) => Measure === 'Local_Jobs' && WebID === +filters.WebID && NJKQtrComp < 0,
  );

  const TopThree = Top(3);
  const topThree = TopThree(
    absSort(
      LocalJobsImpactNJK.filter(({ NieirInd1DigitWebKey }) => NieirInd1DigitWebKey != 22000),
      'NJKQtrComp',
    ),
  );

  return (
    <>
      <PageIntroFullWidth>
        <p>
          COVID19 will have a substantial negative impact on economic activity in 2020. The spatial impacts of the
          pandemic are uneven and will depend on the level of cases, industry mix and export exposure. To help planning
          the local recovery, Northern Beaches Council requested forecasts of the impact of COVID-19 over the short and
          medium term.
        </p>
        <p>
          In response, .id has developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA
          level. This tool draws on NIEIR’s economic forecasts of COVID-19 over a three year period. Understanding the
          nature and duration of the local impacts and how they compare to other regions will help guide the local
          economic recovery. More detail on the methodology and assumptions can be found here.
        </p>
        <p>
          Compared to pre COVID-19 forecasts, Northern Beaches LGA economy will be $498 million, or 3% smaller in 2020.
          This impact is relatively high and is well above the Greater Sydney impact of -2.5%.
        </p>
        <p>
          As illustrated in the figure below, the cumulative impact of COVID-19 is estimated at $826 million over the
          next two years.
        </p>
        <p>
          There will be around 4,263 fewer jobs in 2020 than the pre COVID 19 forecasts. This impact represents around
          3.9% of all jobs, well above the impact on the Greater Sydney Region. Local Jobs are not forecast to reach pre
          COVID-19 levels before June Qtr 2022. The impact on Employed residents is forecast to be higher than Local
          Jobs.
        </p>
        <p>
          But many more jobs are vulnerable and are currently being supported by JobKeeper. The impacts on Local Jobs
          and Employed residents could be even higher without JobKeeper. The modelling shows that 2,000 jobs, or 9% of
          all jobs, are at risk once the scheme is tapered back.
        </p>
        <p>
          This tool should be viewed in conjunction with{' '}
          {LinkBuilder(`https://economy.id.com.au/${clientAlias}/unemployment`, 'Unemployment')} and{' '}
          {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section to understand the
          impact of COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the
          Business Trends section.
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />
      <SectionTitle>
        Headline estimates - {currentAreaName}
        <span>Impacts refer to September quarter 2020 compared to September quarter 2019</span>
      </SectionTitle>
      <TilesGrid>
        <Tile>
          <Title>GRP change</Title>
          <NumberValue>4%</NumberValue>
          <Footer>currentBenchmarkName: 23%</Footer>
        </Tile>
        <Tile>
          <Title>Local job change</Title>
          <NumberValue>4.5%</NumberValue>
          <Footer>5.2% without the JobKeeper scheme)</Footer>
        </Tile>
        <Tile>
          <Title>Employed resident change</Title>
          <NumberValue>4.5%</NumberValue>
          <Footer>4.5%% without the JobKeeper scheme</Footer>
        </Tile>
      </TilesGrid>
      <TilesGrid2Col>
        <Tile>
          <Title>Sector impacts - Top 3 (without the JobKeeper scheme)</Title>
          <TopList>
            {topThree.map((item, i) => {
              return (
                <li key={i}>
                  {item.NieirIndWeb1DigitName} ({formatNumber(item.NJKQtrComp)} local jobs)
                </li>
              );
            })}
          </TopList>
        </Tile>
      </TilesGrid2Col>
      <SectionTitle>Key Insights</SectionTitle>
      <TopList>
        <li>
          GRP is forecast to be {formatPercent(Math.abs(GRPLGA.QtrChgPer))}% {GRPLGAAdj} in the September quarter 2020
          than the same quarter in 2019. {GRPCompTextFinal}
        </li>
        <li>
          Local Jobs are forecast to {JOBSLGAText} by {formatPercent(JOBSLGA.ExJKCompPer)}% in the September Quarter
          2020. This equates to a {JOBSLGATextAlt} of {formatNumber(Math.abs(JOBSLGA.NJKQtrComp))} local jobs.
        </li>
        <li>
          In the absence of JobKeeper payments, the employment {JOBSLGATextAlt} is estimated at{' '}
          {formatPercent(JOBSLGA.QtrChgPer)}% ({formatNumber(Math.abs(JOBSLGA.QtrChg))} jobs)
        </li>
        <li>
          The impact on employed residents ({formatPercent(URJOBSLGA.ExJKCompPer)}%) was {URJOBSIMPACTText} than the
          local job impact.
        </li>
      </TopList>

      <Disclaimers />
    </>
  );
};
export default FullContent;
// #endregion

// #region imports
import React, { useContext } from 'react';
import _ from 'lodash';
import { PageContext } from '../../../utils/context';
import { formatPercent, formatNumber, absSort, Top } from '../../../utils';
import {
  _SubTitle,
  PageIntroFullWidth,
  Lead,
  TopList,
  SubTitleAlt2,
  ItemWrapper,
} from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { SectionTitle, TilesGrid, Tile, Title, NumberValue, Footer, TilesGrid2Col } from './Styles';
import Disclaimers from './Disclaimers';
import ImpactByRegionChart from './charts/ImpactByRegionChart';
import EconomicImpactChart from './charts/EconomicImpactChart';
import JobsImpactChart from './charts/JobsImpactChart';
// #endregion

// #region template page
const FullContent = () => {
  const {
    filters,
    entityData: { currentAreaName, prefixedAreaName },
    contentData: { headlineData, topThreeData },
  } = useContext(PageContext);

  const LGA = headlineData.filter(({ WebID }) => WebID != 40);
  const BM = headlineData.filter(({ WebID }) => WebID === 40);
  const currentBenchmarkName = BM[0].GeoName;

  const GRPLGA = LGA.find(item => item.Measure === 'GRP');
  const GRPBM = BM.find(item => item.Measure === 'GRP');

  const JOBSLGA = LGA.find(item => item.Measure === 'Local_Jobs');
  const JOBSBM = BM.find(item => item.Measure === 'Local_Jobs');

  const URJOBSLGA = LGA.find(item => item.Measure === 'UR_Jobs');
  const URJOBSBM = BM.find(item => item.Measure === 'UR_Jobs');

  const GRPLGAText = Math.sign(GRPLGA.QtrChgPer) === -1 ? 'fall' : 'grow';
  const GRPLGATextAlt = Math.sign(GRPLGA.QtrChgPer) === -1 ? 'fall' : 'growth';
  const GRPCOMPText = GRPLGA.QtrChgPer < GRPBM.QtrChgPer ? 'higher' : 'lower';

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
      <Lead>Version 2.1 (Model updated 29 Sept 2020. See revision notes below)</Lead>
      <PageIntroFullWidth>
        <p>
          COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
          developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws
          on the economic forecast model developed by NIEIR and focuses on the impacts to September 2020.
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
          <NumberValue>{formatPercent(GRPLGA.QtrChgPer)}%</NumberValue>
          <Footer>
            ({currentBenchmarkName}: {formatPercent(GRPBM.QtrChgPer)}%)
          </Footer>
        </Tile>
        <Tile>
          <Title>Local job change</Title>
          <NumberValue>{formatPercent(JOBSLGA.ExJKCompPer)}%</NumberValue>
          <Footer>({formatPercent(JOBSLGA.QtrChgPer)}% without the JobKeeper scheme)</Footer>
        </Tile>
        <Tile>
          <Title>Employed resident change</Title>
          <NumberValue>{formatPercent(URJOBSLGA.ExJKCompPer)}%</NumberValue>
          <Footer>({formatPercent(URJOBSLGA.QtrChgPer)}% without the JobKeeper scheme)</Footer>
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
          Gross Regional Product is forecast to {GRPLGAText} by {formatPercent(GRPLGA.QtrChgPer)}% in the September
          Quarter 2020. This {GRPLGATextAlt} was {GRPCOMPText} than the state average.
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
      <ItemWrapper>
        <ImpactByRegionChart />
      </ItemWrapper>

      <SectionTitle>Industry Impacts</SectionTitle>
      {/* <Lead>
        The impact of COVID-19 will vary from region to region and will depend on the regions supply chain and trade
        exposure (domestic and international), reliance on tourism and exposure to consumer demand (e.g. accommodation,
        food services, arts and recreation).
      </Lead> */}
      <Lead>Industry impacts data will be available soon.</Lead>

      {/* <SubTitleAlt2>Economic Impact</SubTitleAlt2>
      <p>
        The chart below presents the output and value added impacts of COVID-19 in the September Quarter 2020. Output
        refers to the total sales of each industry in the region. Value Added refers to the wages and salaries paid to
        workers in the region, the gross operating surplus and taxes. Value added impacts show how the different
        industries impact GRP in the region.
      </p>
      <ItemWrapper>
        <EconomicImpactChart />
      </ItemWrapper>

      <SubTitleAlt2>Local Jobs Impact</SubTitleAlt2>
      <p>
        This indicator shows the estimated number of jobs in {prefixedAreaName}. Local job impacts are typically higher
        in regions with a relatively high share of service sector and labour-intensive jobs (e.g. tourism and
        hospitality, entertainment, and business services).{' '}
      </p>
      <ItemWrapper>
        <JobsImpactChart measure={'Local_Jobs'} />
      </ItemWrapper>
      <SubTitleAlt2>Employed Resident Impacts</SubTitleAlt2>
      <p>
        Another way of looking at the impacts is to analyse the industry impact on local residents, that is employed
        residents who live in the region but may work elsewhere. This is important in understanding the impacts on
        council rates and local unemployment.
      </p>
      <ItemWrapper>
        <JobsImpactChart measure={'UR_Jobs'} />
      </ItemWrapper> */}
      <Disclaimers />
    </>
  );
};
export default FullContent;
// #endregion

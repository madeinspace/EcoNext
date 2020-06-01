// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { PageContext } from '../../../utils/context';
import { formatPercent, formatNumber, absSort, Top } from '../../../utils';
import { _SubTitle, PageIntroFullWidth, Lead, TopList, SubTitleAlt2 } from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { SectionTitle, TilesGrid, Tile, Title, NumberValue, Footer, TilesGrid2Col } from './Styles';
import Disclaimers from './Disclaimers';
import ImpactByRegionChart from './charts/ImpactByRegionChart';
import JobsImpactChart from './charts/JobsImpactChart';
import EconomicImpactChart from './charts/EconomicImpactChart';
// #endregion

// #region template page
const FullContent = () => {
  const {
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

  const JOBSLGAText = Math.sign(URJOBSLGA.QtrChgPer) === -1 ? 'fall' : 'grow';
  const JOBSLGATextAlt = Math.sign(URJOBSLGA.QtrChgPer) === -1 ? 'fall' : 'growth';

  const URJOBSIMPACTText = Math.abs(URJOBSLGA.ExJKCompPer) > Math.abs(JOBSLGA.ExJKCompPer) ? 'higher' : 'lower';

  const NegativeImpactNJK = topThreeData.filter(({ NJKQtrComp }) => NJKQtrComp < 0);

  const TopThree = Top(3);
  const topThree = TopThree(
    absSort(
      NegativeImpactNJK.filter(({ NieirInd1DigitWebKey }) => NieirInd1DigitWebKey != 22000),
      'NJKQtrComp',
    ),
  );

  return (
    <>
      <Lead>Version 1.1 (Model updated 7 May 2020. See revision notes below)</Lead>
      <PageIntroFullWidth>
        <p>
          COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
          developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws
          on the economic forecast model developed by NIEIR and focuses on the impacts to June 2020. We will continue to
          update our forecasts as more information is known about the health measures and the effectiveness of economic
          policy.
        </p>
        <p>This page is subject to the disclaimer and copyright notices as set out below.</p>
      </PageIntroFullWidth>
      <ControlPanel />
      <SectionTitle>
        Headline estimates - {currentAreaName}
        <span>Impacts refer to June Quarter 2020 compared to 2018/19 4-quarter average</span>
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
          <Footer>({formatPercent(JOBSLGA.QtrChgPer)}% including JobKeeper recipients)</Footer>
        </Tile>
        <Tile>
          <Title>Employed resident change</Title>
          <NumberValue>{formatPercent(URJOBSLGA.ExJKCompPer)}%</NumberValue>
          <Footer>({formatPercent(URJOBSLGA.QtrChgPer)}% including JobKeeper recipients)</Footer>
        </Tile>
      </TilesGrid>
      <TilesGrid2Col>
        <Tile>
          <Title>Sector impacts - Top 3 (excluding JobKeeper)</Title>
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
          Gross Regional Product is forecast to {GRPLGAText} by {formatPercent(GRPLGA.QtrChgPer)}% in the June Quarter
          2020. This {GRPLGATextAlt} was {GRPCOMPText} than the state average.
        </li>
        <li>
          Local Jobs are forecast to {JOBSLGAText} by {formatPercent(JOBSLGA.ExJKCompPer)}% in the June Quarter 2020.
          This equates to a {JOBSLGATextAlt} of {formatNumber(Math.abs(JOBSLGA.NJKQtrComp))} local jobs.
        </li>
        <li>
          If JobKeeper recipients impacts are included then the employment {JOBSLGATextAlt} is estimated at{' '}
          {formatPercent(JOBSLGA.QtrChgPer)}% ({formatNumber(Math.abs(JOBSLGA.QtrChg))} jobs)
        </li>
        <li>
          The impact on employed residents ({formatPercent(URJOBSLGA.ExJKCompPer)}%) was {URJOBSIMPACTText} than the
          local job impact.
        </li>
      </TopList>
      <ImpactByRegionChart />
      <SectionTitle>Industry Impacts</SectionTitle>
      <Lead>
        The impact of COVID-19 will vary from region to region and will depend on the regions supply chain and trade
        exposure (domestic and international), reliance on tourism and exposure to consumer demand (e.g. accommodation,
        food services, arts and recreation).
      </Lead>

      <SubTitleAlt2>Economic Impact</SubTitleAlt2>
      <p>
        The chart below presents the output and value added impacts of COVID-19 in the June Quarter 2020. Output refers
        to the total sales of each industry in the region. Value Added refers to the wages and salaries paid to workers
        in the region, the gross operating surplus and taxes. Value added impacts show how the different industries
        impact GRP in the region.
      </p>
      <EconomicImpactChart />

      <SubTitleAlt2>Local Jobs Impact</SubTitleAlt2>
      <p>
        This indicator shows the estimated number of jobs in {prefixedAreaName}. Local job impacts are typically higher
        in regions with a relatively high share of service sector and labour-intensive jobs (e.g. tourism and
        hospitality, entertainment, and business services).{' '}
      </p>
      <JobsImpactChart measure={'Local_Jobs'} />
      <SubTitleAlt2>Employed Resident Impacts</SubTitleAlt2>
      <p>
        Another way of looking at the impacts is to analyse the industry impact on local residents, that is employed
        residents who live in the region but may work elsewhere. This is important in understanding the impacts on
        council rates and local unemployment.
      </p>
      <JobsImpactChart measure={'UR_Jobs'} />
      <Disclaimers />
    </>
  );
};
export default FullContent;
// #endregion

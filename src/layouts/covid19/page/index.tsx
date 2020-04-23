// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import styled from 'styled-components';
import { formatPercent, formatLongNumber, formatNumber, absSort } from '../../../utils';

// #endregion

// #region template page
const CovidPage = () => {
  const { LongName } = useContext(ClientContext);
  const {
    contentData: { newsData, headlineData, topThreeData },
  } = useContext(PageContext);
  const LGA = headlineData.filter(({ WebID }) => WebID === 10);
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

  const URJOBSIMPACTText = URJOBSLGA.ExJKCompPer > JOBSLGA.ExJKCompPer ? 'higher' : 'lower';

  const Top = n => quals =>
    _(quals)
      .takeRight(n)
      .reverse()
      .value();

  const TopThree = Top(3);
  const topThree = TopThree(absSort(topThreeData, 'QtrChgPer'));

  return (
    <>
      <p>
        COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
        developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws on
        the economic forecast model developed by NIEIR and focuses on the impacts to June 2020. We will continue to
        update our forecasts as more information is known about the health measures and the effectiveness of economic
        policy.{' '}
      </p>

      <SectionTitle>Headline estimates - {LongName}</SectionTitle>
      <TilesGrid>
        <Tile>
          <Title>GRP change</Title>
          <NumberValue>{formatLongNumber(GRPLGA.QtrChgPer)}%</NumberValue>
          <Footer>
            ({currentBenchmarkName}: {formatLongNumber(GRPBM.QtrChgPer)}%)
          </Footer>
        </Tile>
        <Tile>
          <Title>Local job change</Title>
          <NumberValue>{formatLongNumber(JOBSLGA.QtrChgPer)}%</NumberValue>
          <Footer>({formatLongNumber(JOBSLGA.ExJKCompPer)}% excluding job keeper recipients)</Footer>
        </Tile>
        <Tile>
          <Title>Employed resident change</Title>
          <NumberValue>{formatLongNumber(URJOBSLGA.QtrChgPer)}%</NumberValue>
          <Footer>({formatLongNumber(URJOBSLGA.ExJKCompPer)}% excluding job keeper recipients)</Footer>
        </Tile>
      </TilesGrid>
      <TilesGrid2Col>
        <Tile>
          <Title>Sector impacts - Top 3</Title>
          <TopList>
            {' '}
            {topThree.map(item => {
              return (
                <li>
                  {item.NieirIndWeb1DigitName} ({formatLongNumber(item.QtrChgPer)}%)
                </li>
              );
            })}
          </TopList>
        </Tile>
      </TilesGrid2Col>
      <SectionTitle>Key Insights</SectionTitle>
      <TopList>
        <li>
          Gross Regional Product is forecast to {GRPLGAText} by {formatLongNumber(GRPLGA.QtrChgPer)}% in the June
          Quarter 2020. This {GRPLGATextAlt} was {GRPCOMPText} than the state average.
        </li>
        <li>
          Local Jobs are forecast to {JOBSLGAText} by {formatLongNumber(JOBSLGA.QtrChgPer)}% in the June Quarter 2020.
          This equates to a {JOBSLGATextAlt} of {formatNumber(Math.abs(JOBSLGA.QtrChg))} local jobs.
        </li>
        <li>
          If job keeper recipients are counted as 'employed' then the employment {JOBSLGATextAlt} is estimated at{' '}
          {formatLongNumber(JOBSLGA.ExJKCompPer)}% ({formatNumber(Math.abs(JOBSLGA.NJKQtrComp))} jobs)
        </li>
        <li>
          The impact on employed residents ({formatLongNumber(URJOBSLGA.ExJKCompPer)}%) was {URJOBSIMPACTText} than the
          local job impact.
        </li>
      </TopList>
      <SectionTitle>Assumptions and methodology</SectionTitle>
      <p>
        NIEIR has estimated the potential impacts of coronavirus on economic activity, employment and sectors at the LGA
        level.
      </p>
      <p>
        The forecast model estimates the impact on final demand on each industry and then calculates the multiplier
        effects using NIEIR’s regional database. Assumptions are made about the household, business and government
        supression rates directly flowing from the measures introduced to contain the virus. The impact of economic
        measures is also incorporated into the modelling. A contingency factor is also assumed to account for downside
        risks (e.g. productivity impacts from working at home).{' '}
      </p>
      <p>
        The modelling assumes that rigid social distancing measures are maintained well into June. A gradual unwinding
        of social distancing measures are assumed but a more complete recovery only becomes possible when a vaccine
        becomes generally available by the March or June quarter 2021.
      </p>
      <p>
        These forecasts are subject to a high degree of uncertainty and will continue to be improved and updated as more
        information is released.{' '}
      </p>
      {/* <p>A more detailed methodology paper can be downloaded here.</p> */}
    </>
  );
};
export default CovidPage;
// #endregion

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 20px;
`;
const TilesGrid2Col = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(250px, 2fr));
  grid-gap: 20px;
`;
const SectionTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  margin: 20px 0;
`;

const Tile = styled.section`
  padding: 10px 20px 10px 15px;
  background-color: #f8f8f8;
  min-height: 110px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
  span {
    font-size: 12px;
  }
`;
const NumberValue = styled.p`
  color: rgb(0, 154, 68);
  font-size: 35px;
  margin-bottom: 10px;
  line-height: 25px;
`;

const Footer = styled.p`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0;
  font-size: 12px;
  opacity: 0.7;
`;

const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;

// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import styled from 'styled-components';
import { formatPercent, formatNumber, absSort, formatChangeInt, idlogo } from '../../../utils';
import { ItemWrapper, _SubTitle, PageIntroFullWidth, Lead } from '../../../styles/MainContentStyles';
import EntityChart from '../../../components/chart/EntityChart';
import { IdLink } from '../../../components/ui/links';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import InfoBox from '../../../components/ui/infoBox';

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

  const Top = n => quals =>
    _(quals)
      .takeRight(n)
      .reverse()
      .value();

  const TopThree = Top(3);
  const topThree = TopThree(
    absSort(
      topThreeData.filter(({ NieirInd1DigitWebKey }) => NieirInd1DigitWebKey != 22000),
      'QtrChg',
    ),
  );

  return (
    <>
      <PageIntroFullWidth>
        {' '}
        <p>
          COVID19 will obviously have a substantial negative impact on economic activity in 2020. In response, .id has
          developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This tool draws
          on the economic forecast model developed by NIEIR and focuses on the impacts to June 2020. We will continue to
          update our forecasts as more information is known about the health measures and the effectiveness of economic
          policy.{' '}
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
            {topThree.map(item => {
              return (
                <li key={item.NieirInd1DigitWebKey}>
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
      <SectionTitle>Sector Employment impact</SectionTitle>
      <Lead>
        The sector impacts in the chart below were based on information available in mid-April. We are currently
        updating the forecasts to incorporate more recent information. For example, impacts on Education have not been
        as high (e.g. restrictions on schools not as severe as first thought).
      </Lead>
      <InfoBox>
        <span>
          <b>Did you know? </b> You can show/hide or highlight a series in the chart below by clicking or hovering on a
          legend (ie: JobKeeper Component).
        </span>
      </InfoBox>
      <ItemWrapper>
        <EntityChart data={chartBuilderChange()} />
      </ItemWrapper>

      <SectionTitle>Data updates (Last updated 23/04/2020)</SectionTitle>
      <p>
        This page is the latest version of up-to-date economic data showing the local impact of COVID-19. However, as
        new information becomes available, e.g. changes to government stimulus, shifts in quarantine conditions, or the
        release of relevant date etc. revisions and updates will be applied, and new data will be added where possible.{' '}
      </p>
      <p>New features to be published soon, include;</p>
      <TopList>
        <li>jobs detail by industry</li>
        <li>employed resident data</li>
        <li>interactive charts and export functionality</li>
        <li>detailed analysis of Stimulus & Recovery Phase</li>
        <li>Benchmarks so you can compare your impacts to other regions</li>
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
      <SectionTitle>Disclaimer</SectionTitle>
      <p>
        This report has been prepared for {prefixedAreaName}. .id has taken all due care in the preparation of this
        report. Content in this Report is based on Data from the National Institute of Economic and Industry Research
        (NIEIR) and the Data remains the property of the NIEIR. While NIEIR endeavours to provide reliable forecasts and
        believes the material is accurate it will not be liable for any claim by any party acting on such information.
        .id accepts no liability with respect to the correctness, accuracy, currency, completeness, relevance or
        otherwise of this Data. Please view our Privacy Policy, Terms of use and Legal notices.
      </p>
      <SectionTitle>Copyright Notice</SectionTitle>
      <p>
        This Report and all material contained within it is subject to Australian copyright law. Copyright in all such
        material [excluding ABS Data & other data or information where ownership by a third party is evident] is owned
        by .ID Consulting Pty Ltd ACN 084 054 473. Other than in accordance with the Copyright Act 1968 or as
        specifically agreed between .id and the Client, no material from this Report may, in any form or by any means,
        be reproduced, stored in a retrieval system or transmitted, without prior written permission from .id. Any
        enquiries regarding the use of this Report should be directed to{' '}
        <a href="mailto:info@id.com.au">info@id.com.au</a> or 03 9417 2205.
      </p>
    </>
  );
};
export default FullContent;
// #endregion

const ChartSource = () => (
  <p>
    Source: National Institute of Economic and Industry Research (NIEIR) ©2020 Compiled and presented in economy.id by{' '}
    <IdLink />.<br />
    <p>
      Impacts have been split into: (1) not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper –
      performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.
    </p>
  </p>
);

// #region chart builder change
const chartBuilderChange = () => {
  const { LongName } = useContext(ClientContext);
  const {
    entityData: { currentAreaName },
    contentData: { topThreeData },
  } = useContext(PageContext);
  const noTotal = topThreeData.filter(({ NieirInd1DigitWebKey }) => NieirInd1DigitWebKey != 22000);
  const serie = noTotal.map(item => item.QtrChg);
  const withoutJK = noTotal.map(item => item.NJKQtrComp);
  const WithJK = noTotal.map(item => item.JKQtrComp);
  const categories = noTotal.map(({ NieirIndWeb1DigitName }) => NieirIndWeb1DigitName);
  const chartType = 'bar';
  const chartTitle = `Employment impact in June Quarter 2020 (compared to 2018/19 quarter average)`;
  const chartSubtitle = `${currentAreaName}`;
  const xAxisTitle = 'Industry sector';
  const yAxisTitle = `Change in the number of employed (estimated)`;
  const rawDataSource =
    'Source: National Institute of Economic and Industry Research (NIEIR) ©2020 Compiled and presented in economy.id by .id the population experts. Impacts have been split into: (1)not on JobKeeper – unemployed as defined by the ABS; and (2) JobKeeper – performing reduced hours or not working (i.e. 0 hours). Many will not be contributing to economic activity.';
  const chartContainerID = 'chartwfoqChange';
  const chartTemplate = 'Standard';
  const chartHeight = 500;

  const tooltip = function() {
    return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${
      this.category
    }, ${LongName}: ${formatChangeInt(this.y)}`;
  };

  return {
    cssClass: '',
    highchartOptions: {
      height: chartHeight,
      chart: {
        type: chartType,
      },
      title: {
        text: chartTitle,
      },
      subtitle: {
        text: chartSubtitle,
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() {
          return tooltip.apply(this);
        },
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      series: [
        {
          className: 'jobkeeper',
          name: `JobKeeper Component`,
          data: WithJK,
        },
        {
          name: `Not on JobKeeper`,
          data: withoutJK,
        },
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: [
        {
          title: {
            text: yAxisTitle,
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return formatChangeInt(this.value);
            },
          },
        },
      ],
    },
    rawDataSource,
    dataSource: <ChartSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
  };
};

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
  span {
    display: block;
    font-size: 14px;
    font-weight: normal;
    line-height: 25px;
  }
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

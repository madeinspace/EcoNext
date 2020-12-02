import React, { useContext } from 'react';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../../utils/context';
import { formatNumber, Top, formatPercent, formatChangeInt } from '../../../utils';
import { _SubTitle, TopList, Lead, Headline } from '../../../styles/MainContentStyles';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { Tile, Title, NumberValue, Footer, DoubleColumLayout, DoubleColumn, SingleColumn } from './Styles';
import { LinkBuilder } from '../../../components/ui/links';
import ImpactChart from './charts/ImpactChart';
import { FaDollarSign, FaIdBadge, FaListAlt, FaExclamationTriangle } from 'react-icons/fa';
import useDropdown from '../../../utils/hooks/useDropdown';
// #region template page
const FullContent = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { topThreeData, vulnerableJobsData, forecastSummaryData },
  } = useContext(PageContext);

  const dropdownData = [
    { label: '2019/2020', value: '2020' },
    { label: '2020/2021', value: '2021' },
    { label: '2021/2022', value: '2022' },
  ];

  const industryDropDownInitialState = {
    label: '2019/2020',
    value: '2020',
  };
  const [econYearKey, EconYearDropdown] = useDropdown('Financial year', industryDropDownInitialState, dropdownData);

  const TopThree = Top(3);
  const topThree = TopThree(topThreeData.filter(({ IndWebKey }) => IndWebKey != 22000));

  const lgaData = forecastSummaryData.filter(({ WebID }) => WebID === 10);
  const bmData = forecastSummaryData.filter(({ WebID }) => WebID === 20);

  const makeSerie = measure => {
    const pre = lgaData.filter(({ Forecast }) => Forecast === 'Pre').map(item => item[measure]);
    const post = lgaData.filter(({ Forecast }) => Forecast === 'Post').map(item => item[measure]);
    return [
      {
        name: `Pre Covid-19`,
        data: pre,
      },
      {
        className: 'alt-bm-color',
        name: `Post Covid-19`,
        data: post,
      },
    ];
  };

  const categories = forecastSummaryData.filter(({ Forecast }) => Forecast === 'Pre').map(({ EconYear }) => EconYear);

  const makeTooltip = (format = 'num', preffix = '') => {
    return function() {
      const formatted = format === 'num' ? `${formatNumber(this.y)}` : `${formatPercent(this.y)}`;
      return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span>${this.series.name}<br/> ${this.category}: ${formatted}${preffix}`;
    };
  };

  const grpSerie = makeSerie('GRP_Actual');
  const jobsSerie = makeSerie('JTW_Actual');

  const makeMin = serie => {
    const grpMin = Math.floor(Math.min(...serie[0].data));
    const jobMin = Math.floor(Math.min(...serie[1].data));
    const min = Math.min(grpMin, jobMin);
    const floor = min - min * 0.02;
    return floor;
  };

  const grp = {
    chartTitle: `GRP Forecasts`,
    type: 'line',
    series: grpSerie,
    categories,
    tooltip: makeTooltip(),
    yAxis: { softMin: undefined, min: makeMin(grpSerie) },
  };
  const jobs = {
    chartTitle: `Jobs Forecasts`,
    type: 'column',
    series: jobsSerie,
    categories,
    tooltip: makeTooltip(),
    yAxis: { softMin: undefined, min: makeMin(jobsSerie) },
  };

  const lgaGRPPre = lgaData
    .filter(({ Forecast, EconYear }) => Forecast === 'Pre' && EconYear > 2019)
    .reduce((acc, cur) => {
      return acc + cur.GRP_Actual;
    }, 0);

  const lgaGRPPost = lgaData
    .filter(({ Forecast, EconYear }) => Forecast === 'Post' && EconYear > 2019)
    .reduce((acc, cur) => {
      return acc + cur.GRP_Actual;
    }, 0);

  const GRPDiff = lgaGRPPre - lgaGRPPost;

  const getPostImpact = data => measure => {
    const postdata = data.filter(({ Forecast, EconYear }) => Forecast === 'Post' && EconYear === '2020');
    return postdata[0][measure];
  };
  const lgaPostImpact = getPostImpact(lgaData);
  const bmPostImpact = getPostImpact(bmData);
  const LGAGRPImpacts = lgaPostImpact('GRP_Change_Per');
  const BMGRPImpacts = bmPostImpact('GRP_Change_Per');
  const LGALocalJobsImpacts = lgaPostImpact('JTW_Change_Per');
  const LGALocalJobsImpactsChg = lgaPostImpact('JTW_Change');
  const LGAURJobsImpacts = lgaPostImpact('UR_Change_Per');
  const BMLocalJobsImpacts = bmPostImpact('JTW_Change_Per');

  const LGAVulnerableLocalJobs = vulnerableJobsData.filter(({ WebID }) => WebID === 10)[0].JTW_NoProductive;
  const LGAVulnerableLocalJobsPer = vulnerableJobsData.filter(({ WebID }) => WebID === 10)[0].JTW_NoProductive_Per;
  const BMVulnerableLocalJobsPer = vulnerableJobsData.filter(({ WebID }) => WebID === 20)[0].JTW_NoProductive_Per;

  return (
    <>
      <DoubleColumLayout>
        <DoubleColumn>
          <Lead>
            COVID19 will have a substantial negative impact on economic activity in 2020. The spatial impacts of the
            pandemic are uneven and will depend on the level of cases, industry mix and export exposure. In response,
            .id has developed a COVID-19 Outlook Tool to show the economic and industry impacts at the LGA level. This
            tool draws on NIEIR’s economic forecasts of COVID-19 over a three year period.
          </Lead>
          <p>
            Compared to pre COVID-19 forecasts, Northern Beaches LGA economy will be {GRPDiff} million, or{' '}
            {`${formatNumber(LGAGRPImpacts)}%`} smaller in 2020. This impact is relatively high and is well above the
            Greater Sydney impact of {`${formatNumber(BMGRPImpacts)}%`}.
          </p>
          <p>
            As illustrated in the figure below, the cumulative impact of COVID-19 is estimated at $826 million over the
            next two years.
          </p>
          <p>
            There will be around {`${formatNumber(LGALocalJobsImpactsChg)}`} fewer jobs in 2020 than the pre COVID 19
            forecasts. This impact represents around {`${formatPercent(LGALocalJobsImpacts)}%`} of all jobs, well above
            the impact on the Greater Sydney Region. Local Jobs are not forecast to reach pre COVID-19 levels before
            June Qtr 2022. The impact on Employed residents is forecast to be higher than Local Jobs.
          </p>
          <p>
            But many more jobs are vulnerable* and are currently being supported by JobKeeper. The impacts on Local Jobs
            and Employed residents could be even higher without JobKeeper. The modelling shows that{' '}
            {LGAVulnerableLocalJobs} Local Jobs, or {`${formatPercent(LGAVulnerableLocalJobsPer)}%`} of all jobs, are at
            risk once the scheme is tapered back.
          </p>

          <p>* working 0 hours but on JobKeeper (as at Sept Qtr 2020)</p>
        </DoubleColumn>

        <SingleColumn>
          <Headline>Compare the {econYearKey.label} Covid forecasts to the pre-covid forecasts</Headline>
          {/* <EconYearDropdown /> */}
          <Tile>
            <Title>
              <span>
                <FaDollarSign size={'30px'} />
              </span>
              Economic impacts on GRP
            </Title>
            <NumberValue>{`${formatPercent(LGAGRPImpacts)}% `}</NumberValue>
            <Footer>
              {`${formatPercent(BMGRPImpacts)}% `} <span>{`${bmData[0].GeoName}`}</span>
            </Footer>
          </Tile>
          <Tile>
            <Title>
              <span>
                <FaIdBadge size={'30px'} />
              </span>
              Impacts on employment
            </Title>
            <NumberValue>
              {`${formatPercent(LGALocalJobsImpacts)}%`} <span>Local Jobs</span>
            </NumberValue>
            <NumberValue>
              {`${formatPercent(LGAURJobsImpacts)}%`} <span>Employed residents</span>
            </NumberValue>
            <Footer>
              {`${formatPercent(BMLocalJobsImpacts)}%`} <span>{bmData[0].GeoName}</span>
            </Footer>
          </Tile>
          <Tile>
            <Title>
              <span>
                <FaExclamationTriangle size={'30px'} />
              </span>
              Vulnerable jobs*
            </Title>
            <NumberValue>
              {LGAVulnerableLocalJobs} <span>Local jobs</span>
            </NumberValue>
            <NumberValue>
              {`${formatPercent(LGAVulnerableLocalJobsPer)}%`} <span>{LongName}</span>
            </NumberValue>
            <Footer>
              {`${formatPercent(BMVulnerableLocalJobsPer)}%`} <span>{bmData[0].GeoName}</span>
            </Footer>
          </Tile>
          <Tile>
            <Title>
              <span>
                <FaListAlt size={'30px'} />
              </span>
              The 3 most impacted sectors
            </Title>
            <TopList>
              {topThree.map((item, i) => {
                return (
                  <li key={i}>
                    {item.IndWebName}: <strong>{formatPercent(item.JTW_Diff_Per)}%</strong> (
                    {formatChangeInt(item.JTW_Diff)} Local jobs)
                  </li>
                );
              })}
            </TopList>
          </Tile>
        </SingleColumn>
      </DoubleColumLayout>
      <DoubleColumLayout>
        <SingleColumn>
          <ImpactChart data={grp} />
        </SingleColumn>
        <SingleColumn>
          <ImpactChart data={jobs} />
        </SingleColumn>
      </DoubleColumLayout>
      <p>
        This tool should be viewed in conjunction with{' '}
        {LinkBuilder(`https://economy.id.com.au/${clientAlias}/unemployment`, 'Unemployment')} and{' '}
        {LinkBuilder(`https://profile.id.com.au/${clientAlias}/job-seeker`, 'JobSeeker')} section to understand the
        impact of COVID-19 on the local labour force. To monitor the impact of COVID-19 on local businesses, see the
        Business Trends section.
      </p>
      <ControlPanel />
    </>
  );
};
export default FullContent;
// #endregion

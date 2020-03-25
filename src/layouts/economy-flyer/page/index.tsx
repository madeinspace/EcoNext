import { LinkBuilder } from '../../../components/ui/links';
import { SubTitleAlt, TopList, TopOrderedList } from '../../../styles/MainContentStyles';
import styled from 'styled-components';

const Cols = styled.div`
  display: flex;
  > div {
    flex: 1;
  }
`;
const Heading = styled.h3`
  font-weight: bold;
`;
const EconomyFlyerPage = () => {
  return (
    <>
      <SubTitleAlt>What is economy.id?</SubTitleAlt>
      <p>
        economy.id is a comprehensive economic profile of your Local Government Area, providing you with access to a
        range of different datasets to build a cohesive story of your local economy, how it is changing and how it
        compares to other areas.
      </p>
      <SubTitleAlt>What does it look like?</SubTitleAlt>
      <p>
        economy.id is presented online as a web application. It includes tables, charts and maps with benchmarking, time
        series and written analysis on trends and key points of interest.
      </p>
      <SubTitleAlt>What information is included?</SubTitleAlt>
      <p>economy.id provides comprehensive data structured to build a narrative about the local economy.</p>
      <Cols>
        <div>
          <Heading>Introduction</Heading>
          <TopList>
            <li>Home</li>
            <li>About the area</li>
            <li>Infrastructure</li>
          </TopList>
          <Heading>Economic indicators</Heading>
          <TopList>
            <li>Population</li>
            <li>Gross product</li>
            <li>Unemployment</li>
            <li>Building approvals</li>
            <li>Retail trade</li>
            <li>Consumer Price Index</li>
          </TopList>
          <Heading>Workforce profiles</Heading>
          <TopList>
            <li>Employment (Census)</li>
            <li>Key statistics</li>
            <li>Age structure</li>
            <li>Hours worked</li>
            <li>Occupations</li>
            <li>Qualifications</li>
            <li>Field of Qualification</li>
            <li>Income</li>
          </TopList>
          <Heading>Size</Heading>
          <TopList>
            <li>Gross Regional Product</li>
          </TopList>
        </div>
        <div>
          <Heading>Structure</Heading>
          <TopList>
            <li>Employment (FTE)</li>
            <li>Employment (total)</li>
            <li>Value added</li>
            <li>Output</li>
            <li>Exports</li>
            <li>Imports</li>
            <li>Local sales</li>
            <li>Worker productivity</li>
            <li>Businesses</li>
          </TopList>
          <Heading>Skills available</Heading>
          <TopList>
            <li>Key statistics</li>
            <li>Industry</li>
            <li>Age structure</li>
            <li>Hours worked</li>
            <li>Occupations</li>
            <li>Qualifications</li>
            <li>Field of qualification</li>
            <li>Income</li>
          </TopList>
          <Heading>Contribution</Heading>
          <TopList>
            <li>Industry sector analysis</li>
          </TopList>
        </div>
        <div>
          <Heading>Spatial economy</Heading>
          <TopList>
            <li>Employment locations</li>
          </TopList>
          <Heading>Journey to work</Heading>
          <TopList>
            <li>Workers place of residence by industry</li>
            <li>Residents place of work by industry</li>
            <li>Workers place of residence by occupation</li>
            <li>Residents place of residence by occupation</li>
          </TopList>
          <Heading>Self containment</Heading>
          <TopList>
            <li>Employment self-containment</li>
            <li>Employment self-sufficiency</li>
          </TopList>
          <Heading>Local market</Heading>
          <TopList>
            <li>Market characteristics</li>
          </TopList>
          <Heading>What if analysis</Heading>
          <TopList>
            <li>Economic impact model</li>
            <li>Supporting information</li>
          </TopList>
        </div>
      </Cols>
      <SubTitleAlt>How often is the data updated?</SubTitleAlt>
      <p>
        Data in economy.id is regularly updated. Economic indicators are updated quarterly. Modelled data on employment,
        industry value, and business counts are updated annually and Census data every 5 years. Notifications of updates
        are provided in the news section on the home page.
      </p>
      <SubTitleAlt>Where does the data come from?</SubTitleAlt>
      <p>
        Because reliable primary economic data sets generally only exist at the national and state level at best, we
        partner with National Economics (NIEIR). NIEIR are recognised as industry leaders in the development and
        provision of robust economic modelling at the LGA level. Other data sources in economy.id include:
      </p>
      <TopList>
        <li>ABS Census</li>
        <li>ABS Place of Work</li>
        <li>ABS Journey to Work</li>
        <li>ABS Business Register</li>
        <li>ABS National Accounts</li>
        <li>ABS Labour Force Survey</li>
        <li>Department of Education, Employment and Workplace Relations (DEEWR) Small Area Labour Markets</li>
        <li>ABS Building Approvals</li>
        <li>ABS Estimated Resident Population (ERP)</li>
        <li>ABS Consumer Price Index</li>
        <li>ABS Retail Business Survey</li>
      </TopList>
    </>
  );
};

export default EconomyFlyerPage;

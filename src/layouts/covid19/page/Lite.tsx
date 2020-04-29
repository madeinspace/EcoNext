import { TopList } from '../../../styles/MainContentStyles';
import styled from 'styled-components';
// #region LiteContent
const LiteContent = () => {
  return (
    <>
      <p>Are you interested in how the current global economic ‘shock’ is affecting your local economy?</p>
      <p>Did you know that .id consulting has new COVID-19 data available?</p>
      <SectionTitle>
        .id has forecast estimates showing the impacts of COVID up to June 2020 in the following areas:
      </SectionTitle>
      <TopList>
        <li>Jobs</li>
        <li>Industry Change</li>
        <li>The impact of Job Seeker stimulus</li>
        <li>GRP</li>
        <li>Comparison to State and National averages.</li>
      </TopList>
      <p>It also includes regular updates as new data comes to light.</p>
      <SectionTitle>Our clients all over Australia are using it for the following;</SectionTitle>
      <TopList>
        <li>Identifying which parts of their economy have experienced the most decline and growth</li>
        <li>Supporting their applications for grants, funding and new infrastructure </li>
        <li>Reviewing & updating local strategy & policy </li>
        <li>Preparation of recovery of your area with economic data and evidence. </li>
      </TopList>
      <p>
        To access the most up-to-date and localised COVID-19 data available, please contact us at{' '}
        <a href="mailto:economy@id.com.au">economy@id.com.au</a>
      </p>
    </>
  );
};

const SectionTitle = styled.h3`
  font-weight: bold;
  font-size: 14px;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  margin-top: 20px;
  span {
    display: block;
    font-size: 14px;
    font-weight: normal;
    line-height: 25px;
  }
`;

export default LiteContent;

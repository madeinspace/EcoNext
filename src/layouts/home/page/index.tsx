// #region imports
import _ from 'lodash';
import { useContext } from 'react';
import { PageContext } from '../../../utils/context';
import { StatsGrid } from './StatsGrid';
import { NewsGrid } from './NewsGrid';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const MapboxGLMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion
const SectionTitle = styled.h3`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  margin: 20px 0;
`;
// #region template page
const HomeTemplate = () => {
  const { contentData } = useContext(PageContext);
  console.log('contentData: ', contentData);
  const { statsData, newsData } = contentData;
  return (
    <>
      <StatsGrid tiles={statsData} />
      <SectionTitle>Economic Region</SectionTitle>
      <MapboxGLMap />
      <NewsGrid newsTiles={newsData} />
    </>
  );
};
export default HomeTemplate;
// #endregion

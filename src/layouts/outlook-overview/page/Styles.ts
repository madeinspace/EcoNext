import styled from 'styled-components';
import { Headline } from '../../../styles/MainContentStyles';

export const DoubleColumLayout = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

export const SingleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  /* grid-gap: 20px; */
  column-gap: 20px;
`;

export const DoubleColumn = styled(SingleColumn)`
  flex: 1;
  p:not(SingleColumn) {
    font-size: 16px;
  }
`;

export const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 20px;
`;
export const TilesGrid2Col = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(250px, 2fr));
  grid-gap: 20px;
`;
export const SectionTitle = styled.h3`
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

export const Tile = styled.section`
  padding: 10px 20px 10px 15px;
  background-color: #f8f8f8;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin || '0px'};
`;
export const Title = styled.h1`
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  span {
    font-size: 14px;
    margin-right: 10px;
    color: #6a6a6a;
  }
`;
export const NumberValue = styled.p`
  color: rgb(0, 154, 68);
  font-size: 30px;
  line-height: 25px;
  span {
    font-size: 16px;
  }
`;

export const Footer = styled.p`
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 25px;
  span {
    font-size: 16px;
  }
`;

export const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;

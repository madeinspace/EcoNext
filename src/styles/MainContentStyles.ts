import styled from 'styled-components';

export const Lead = styled.p`
  font-weight: 600;
`;

export const SidebarNav = styled.div`
  margin-right: 1rem;
  width: 240px;
  flex: 1;
  @media screen and (min-width: 1200px) {
    width: 280px;
  }
`;

export const SiteContent = styled.div`
  /* grid-area: content; */
  flex: 3;
  width: 720px;
  @media screen and (min-width: 1200px) {
    width: 920px;
  }
`;

export const TitleContainer = styled.div`
  color: #5f6062;
`;

export const EntityContainer = styled.div`
  position: relative;
`;

export const MainTitle = styled.h1`
  font-size: 45px;
  padding: 0;
  margin: 0 0 10px 0;
  font-weight: 400;
  width: 80%;
  border-bottom: none;
`;

export const TopList = styled.ul`
  margin: 10px 0 10px 20px;
  li {
    list-style: disc;
    line-height: 20px;
  }
`;

export const TopOrderedList = styled.ol`
  margin: 10px 0 10px 20px;
  li {
    line-height: 20px;
  }
`;

export const _SubTitle = styled.h3`
  font-size: 23px;
  line-height: 27px;
  margin-bottom: 1.45em;
`;
export const SubTitleAlt = styled(_SubTitle)`
  margin-top: 1.45em;
  margin-bottom: 1.2em;
  color: #009a44;
`;

export const Headline = styled.p`
  position: relative;
  color: #009a44;
  font-size: 23px;
  line-height: 26px;
  margin-bottom: 30px;
`;

export const PageIntro = styled.div`
  display: grid;
  grid-template-areas: 'text . bubble';
  grid-template-columns: 65% 5% 30%;
  p {
    line-height: 18px;
  }
  margin-bottom: 20px;
`;

export const LayoutHalfHalf = styled.div`
  display: grid;
  grid-template-areas: 'chart . text';
  grid-template-columns: 45% 5% 50%;
  p {
    line-height: 18px;
  }
  margin-bottom: 20px;
`;

export const PageIntroFullWidth = styled.div`
  display: grid;
  grid-template-areas: 'text';
  grid-template-columns: 100%;
  p {
    line-height: 18px;
  }
  margin-bottom: 20px;
`;

export const ItemWrapper = styled.div`
  page-break-inside: avoid;
  /* page-break-after: always; */
  margin: 20px 0;
`;

export const MapWrapper = styled(ItemWrapper).attrs({ className: `e-shad` })`
  position: relative;
  min-height: 400px;
`;

export const ProductIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  color: #fff;
  justify-content: center;
  font-family: 'Zurich', sans-serif;
  font-weight: 500;
  line-height: 20px;
  align-content: center;
  margin-right: 5px;
`;

export const ForecastProductIcon = styled(ProductIcon)`
  background-color: #3b6e8f;
  &::before {
    content: 'f';
  }
`;

export const ProfileProductIcon = styled(ProductIcon)`
  background-color: #cb2c30;
  &::before {
    content: 'P';
  }
`;

export const CrossLink = styled.div`
  a {
    color: #757575;
  }
`;

export const Note = styled.div`
  background: #f2f2f2;
  border: 0;
  padding: 20px 40px;
  line-height: 20px;
  margin: 30px 0;
`;
export const AnalysisContainer = styled.div`
  h3 {
    color: #009a44;
    margin-bottom: 8px;
    border-bottom: 1px solid #999;
    font-size: 23px;
    padding-bottom: 5px;
  }
`;

export const Highlight = styled.p`
  color: #009a44;
`;

export const SourceBubble = styled.div`
  grid-area: bubble;
  div {
    h3 {
      font-size: 20px;
      margin-bottom: 10px;
      color: #009a44;
    }
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;

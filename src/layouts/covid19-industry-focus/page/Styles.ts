import styled from 'styled-components';

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
`;
export const Title = styled.h1`
color: #333;
font-size: 18px;
margin-bottom: 10px;
span {
  font-size: 12px;
}
`;
export const NumberValue = styled.p`
color: rgb(0, 154, 68);
font-size: 35px;
margin-bottom: 10px;
line-height: 25px;
`;

export const Footer = styled.p`
flex: 1;
display: flex;
justify-content: flex-start;
align-items: flex-end;
margin: 0;
font-size: 12px;
opacity: 0.7;
`;

export const TopList = styled.ul`
margin: 10px 0 10px 20px;
li {
  list-style: disc;
  line-height: 20px;
}
`;

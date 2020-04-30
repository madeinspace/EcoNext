import styled from 'styled-components';
import { formatNumber, formatShortDecimal } from '../../../utils';
import MonolithOrNextLink from '../../../components/Link';
import { useContext } from 'react';
import { ClientContext } from '../../../utils/context';
const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
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

const TextValue = styled.h3`
  color: rgb(0, 154, 68);
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
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

const StatsLink = styled(MonolithOrNextLink)`
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.02, 0.69, 0.14, 1);
  &:hover {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.1), 0 12px 17px 2px rgba(0, 0, 0, 0.08),
      0 5px 22px 4px rgba(0, 0, 0, 0.06);
  }
`;
export const StatsGrid = ({ tiles }) => {
  const statsLinksLookup = {
    1: 'gross-product',
    2: 'population',
    3: 'local-jobs',
    4: 'employment-by-industry',
    5: 'number-of-businesses-by-industry',
    6: 'employed-residents',
  };

  const statsTiles = tiles.map(tile => {
    const anchor = statsLinksLookup[tile.BoxNumber];
    const number = tile.BoxName === 'GRP' ? `$${formatShortDecimal(tile.Number)} billion` : formatNumber(tile.Number);
    const bodyText = tile.TextValue ? <TextValue>{tile.TextValue}</TextValue> : <NumberValue>{number} </NumberValue>;
    const boxTitle =
      tile.BoxName === 'Largest industry' ? (
        <Title>
          Largest industry <span>(by employment)</span>
        </Title>
      ) : (
        <Title>{tile.TopTitle}</Title>
      );
    const { clientAlias } = useContext(ClientContext);
    const { BottomTitle } = tile;

    return (
      <StatsLink href={`/${clientAlias}/${anchor}`} key={tile.BoxNumber}>
        <Tile>
          {boxTitle}
          {bodyText}
          <Footer>{BottomTitle}</Footer>
        </Tile>
      </StatsLink>
    );
  });
  return <TilesGrid>{statsTiles}</TilesGrid>;
};

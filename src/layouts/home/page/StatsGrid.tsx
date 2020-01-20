import styled from 'styled-components';
import { formatNumber } from '../../../utils';
export const StatsGrid = ({ tiles }) => {
  const TilesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
  `;
  const SectionTitle = styled.h3`
    font-weight: bold;
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
  `;

  const statsTiles = tiles.map(tile => {
    const number = tile.BoxName === 'GRP' ? `$${formatNumber(tile.Number)} billion` : formatNumber(tile.Number);
    const bodyText = tile.TextValue ? <TextValue>{tile.TextValue}</TextValue> : <NumberValue>{number} </NumberValue>;
    const boxTitle =
      tile.BoxName === 'Largest industry' ? (
        <Title>
          Largest industry <span>(by employment)</span>
        </Title>
      ) : (
        <Title>{tile.TopTitle}</Title>
      );

    const { BottomTitle } = tile;

    return (
      <Tile key={tile.BoxNumber}>
        {boxTitle}
        {bodyText}
        <Footer>{BottomTitle}</Footer>
      </Tile>
    );
  });
  return (
    <>
      <SectionTitle>Key Statistics</SectionTitle>
      <TilesGrid>{statsTiles}</TilesGrid>
    </>
  );
};

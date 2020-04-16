import styled from 'styled-components';

export const LegendPanel = ({ legends, onLegendOver }) => {
  const handleMouseOver = Rank => onLegendOver(Rank);

  const LegendLabel = ({ item }) => {
    return (
      <Label onMouseOver={() => handleMouseOver(item.Rank)}>
        <LegendColor color={item.color} />
        {item.label}
      </Label>
    );
  };

  const LegendList = (): JSX.Element =>
    legends.map(legendItem => <LegendLabel item={legendItem} key={legendItem.Rank} />);

  return (
    <Legends>
      <LegendList />
    </Legends>
  );
};

const Legends = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Label = styled.label`
  display: flex;
  margin: 0px 0 5px 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendColor = styled.span`
  height: 12px;
  width: 12px;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.color};
  margin: 0px 6px 0 0;
  display: inline-block;
  align-self: center;
`;

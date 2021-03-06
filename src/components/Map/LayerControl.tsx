import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <_CheckBox type={type} name={name} checked={checked} onChange={onChange} />
);

export const LayerControl = ({ layers, onLayerToggle }) => {
  const checkedLayers = layers.filter(({ initVisibility }) => initVisibility === true).map(({ id }) => +id);
  const [checkedItems, setCheckedItems] = useState([4, ...checkedLayers]);

  const handleLayerToggle = event => {
    const id = parseInt(event.target.name);
    let clone = checkedItems.slice(0);
    if (checkedItems.includes(id)) {
      clone = checkedItems.filter(item => item != id);
    } else {
      clone.push(id);
    }
    setCheckedItems([...clone]);
  };

  useEffect(() => {
    // only pass the layers that are active
    onLayerToggle(checkedItems);
  }, [checkedItems]);

  const LayerLabel = ({ item, togg = true }) => {
    const color = item.layerOptions != undefined ? item.layerOptions.styles.default.color : '#000';
    return (
      <Label>
        {togg && <Checkbox name={+item.id} checked={checkedItems.includes(+item.id)} onChange={handleLayerToggle} />}
        <LayerColor color={color} />
        {item.layerName}
      </Label>
    );
  };

  const Maplayers = (): JSX.Element =>
    layers.length > 1 ? (
      layers.map(item => <LayerLabel key={item.id} item={item} />)
    ) : (
      <LayerLabel item={layers[0]} togg={false} />
    );

  return (
    <LayerPanel>
      <Maplayers />
    </LayerPanel>
  );
};

const LayerPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const _CheckBox = styled.input`
  align-self: center;
  margin-right: 10px;
`;

const Label = styled.label`
  display: flex;
  margin: 0px 0 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const LayerColor = styled.span`
  height: 12px;
  width: 12px;

  border: 2px solid ${({ color }) => color};
  margin: 0px 6px 0 0;
  display: inline-block;
  align-self: center;
`;

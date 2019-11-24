import React from 'react';
import styled from 'styled-components';

const Title = styled.h5`
  margin: 0 0 6px 0;
`;

const Select = styled.select`
  border: none;
  height: 25px;
  padding-left: 5px;
  width: 100%;
`;

const Option = styled.option`
  height: 40px;
  padding: 5px 0;
`;

const SelectDropdown: React.FC<any> = ({ title, list, value, handleChange }) => (
  <div>
    <Title>{title}</Title>
    <Select name="select" value={value} onChange={handleChange}>
      {list.map(item => (
        <Option key={item.ID} value={item.ID}>
          {item.Name}
        </Option>
      ))}
    </Select>
  </div>
);

export default SelectDropdown;

import React from 'react';
import styled, { css } from 'styled-components';

const Title = styled.h5`
  margin: 0 0 6px 0;
`;

const Select = styled.select`
  border: none;
  height: 25px;
  padding-left: 5px;
  width: 100%;
`;

const ParentStyle = `
  font-weight:bold;
  font-size:14px;
`;

const Option = styled.option`
  height: 40px;
  padding: 5px 0;
  ${({ isParent }) => isParent && ParentStyle};
  ${({ isParent }) => !isParent && `text-indent: 5px;`};
`;

const SelectDropdown: React.FC<any> = ({ title, list, value, handleChange }) => {
  const HasChildren = parentId => {
    const noParent = list.filter(({ Value }) => parentId != Value);
    return noParent.some(({ ParentValue }) => ParentValue === parentId);
  };
  return (
    <div>
      <Title>{title}</Title>
      <Select name="select" value={value} onChange={handleChange}>
        {list.map(({ Value, ParentValue, Label }) => {
          const hasChildren = HasChildren(ParentValue);
          return (
            <Option key={Value} value={Value} isParent={ParentValue === Value && hasChildren}>
              {Label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectDropdown;

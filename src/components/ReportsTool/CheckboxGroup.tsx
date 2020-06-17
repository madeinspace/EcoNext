import { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components';
import _ from 'lodash';

const CheckboxGroup = ({ group, onSelect }) => {
  const { options, label, id } = group;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState(options.map(li => li.value));

  useEffect(() => {
    if (_.isEmpty(list)) return;
    setIsCheckAll(JSON.stringify(list.sort()) === JSON.stringify(isCheck.sort()));
  }, [list, isCheck]);

  useEffect(() => {
    onSelect({ id, registeredValues: isCheck });
  }, [isCheck]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(isCheckAll ? [] : list);
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    checked ? registerValue(+id) : unregisterValue(+id);
  };

  const registerValue = value => setIsCheck([...isCheck, value]);

  const unregisterValue = value => setIsCheck(isCheck.filter(item => item !== value));

  const catalog = options.map(({ value, label }) => (
    <ChildCBX
      className={'cbx'}
      key={value}
      label={label}
      id={value}
      handleClick={handleClick}
      isChecked={isCheck.includes(value)}
    />
  ));

  return (
    <CheckboxGroupContainer key={id}>
      <ParentCBX className={'cbx'} label={label} id={id} handleClick={handleSelectAll} isChecked={isCheckAll} />
      {catalog}
    </CheckboxGroupContainer>
  );
};

export default CheckboxGroup;

const CheckboxGroupContainer = styled.div`
  margin-bottom: 20px;
`;

const ParentCBX = styled(Checkbox)`
  label {
    font-weight: bold;
  }
`;

const ChildCBX = styled(Checkbox)`
  label {
    margin-left: 16px;
  }
`;

import _ from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from './Checkbox';

const CheckboxGroup = ({ group, onSelect }) => {
  const { options, label, id, value } = group;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [optionIdsList, setOptionIdsList] = useState([]);

  useEffect(() => {
    setOptionIdsList(options.sort().map(({ id }) => id));
  }, []);

  useEffect(() => {
    if (_.isEmpty(optionIdsList)) return;
    const is_same =
      optionIdsList.length == isCheck.length && optionIdsList.every((element, i) => element === isCheck[i]);
    setIsCheckAll(is_same);
    onSelect({ id, registeredOptions: isCheck.map(id => options.filter(item => item.id === id)[0]) });
  }, [isCheck]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(isCheckAll ? [] : optionIdsList);
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    checked ? registerValue(+id) : unregisterValue(+id);
  };

  const registerValue = id => setIsCheck([...isCheck, id]);

  const unregisterValue = id => setIsCheck(isCheck.filter(item => item !== id));

  const catalog = options.map(({ id, value, label }) => (
    <ChildCBX
      className={'cbx'}
      key={id}
      label={label}
      id={id}
      value={value}
      handleClick={handleClick}
      isChecked={isCheck.includes(id)}
    />
  ));

  return (
    <CheckboxGroupContainer key={id}>
      <ParentCBX
        className={'cbx'}
        label={label}
        id={id}
        value={value}
        handleClick={handleSelectAll}
        isChecked={isCheckAll}
      />
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

import { useRef, useState } from 'react';
import styled from 'styled-components';
import useOnClickOutside from './useClickOutside';

const useDropdown = (label, defaultState, options) => {
  const ref = useRef();
  const [state, setState] = useState(defaultState);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = option => () => {
    setState(option);
    setIsOpen(false);
  };
  const Dropdownmaker = () => (
    <DropDownContainer ref={ref}>
      <DropDownHeader onClick={handleToggle}>{state.label || label}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map(option => {
              return (
                <Option parent={option.parent} onClick={handleOptionClick(option)} key={Math.random()}>
                  {option.label}
                </Option>
              );
            })}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
  return [state, Dropdownmaker, setState];
};

export default useDropdown;

const DropDownContainer = styled('div')`
  display: flex;
`;

const DropDownHeader = styled('div')`
  display: flex;
  align-items: baseline;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  margin-bottom: -1px;
  padding: 0.4em 1em;
  font-weight: 500;
  font-size: 1rem;
  color: #70b859;
  background: #ffffff;
  &:after {
    font-family: 'Font Awesome 5 Free';
    margin-left: 15px;
    font-weight: 900;
    content: '\f078';
  }
`;

const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 1;
`;

const DropDownList = styled('ul')`
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  color: #70b859;
  font-size: 0.8rem;
  font-weight: 500;
  padding-right: 20px;
  &:first-child {
    padding-top: 0em;
  }
  height: 400px;
  width: 100%;
  overflow: overlay;
`;

const Option = styled('li')`
  font-weight: ${props => props.parent && 'bold'};
  font-size: ${props => props.parent && '1.1em'};
  padding: 0.8em 1em;
  padding-left: ${props => !props.parent && '30px'};
  list-style: none;
  &:before {
    content: ${props => !props.parent && '-'};
  }
  &:hover {
    cursor: pointer;
    background: #70b859;
    color: #fff;
  }
`;

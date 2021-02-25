import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';

const _InfoBox = styled.div`
  display: ${props => (props.visible ? css`flex` : css`none`)};
  margin: 20px 0;
  padding: ${props => (props.type === 'warning' ? '10px' : '5px')} 0;
  align-items: center;
  color: #595959;
  background: #f2f2f2;
  border-left: 5px solid ${props => (props.type === 'warning' ? 'orange' : '#00a8ff')};
  span {
    line-height: 18px;
  }
`;

const CloseButton = styled.button`
  margin-left: auto;

  padding-right: 15px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 700;
  line-height: 18px;
  color: #000;
  opacity: 0.2;
  cursor: pointer;
  &::hover {
    opacity: 0.7;
  }
`;

const IconBase = styled.span`
  height: 25px;
  width: 25px;
  color: #fff;
  margin: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBox = ({ type = 'info', children }) => {
  const [visible, setVisible] = useState(true);
  const color = () => {
    return type === 'warning' ? 'orange' : '#00a8ff';
  };
  return (
    <_InfoBox visible={visible} type={type}>
      <IconBase>
        <FaInfoCircle size="20px" color={color()} />
      </IconBase>
      {children}
      <CloseButton
        onClick={() => {
          setVisible(!visible);
        }}
      >
        ×
      </CloseButton>
    </_InfoBox>
  );
};

export default InfoBox;

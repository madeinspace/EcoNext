import React, { useState } from 'react';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../../styles/variables.scss`);

const _InfoBox = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  margin: 10px 0;
  padding: 5px 0;
  align-items: center;
  color: ${variables.grayMediumdark};
  background: ${variables.grayLightest};
  border-left: 3px solid #00a8ff;
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

const InfoBox = ({ children }) => {
  const [visible, setVisible] = useState(true);
  return (
    <_InfoBox visible={visible}>
      <IconBase>
        <FaInfoCircle size="18px" color="#00a8ff" />
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

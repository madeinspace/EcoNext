import styled from 'styled-components';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const _SearchIcon = styled.div`
  display: inline-flex;
  margin-right: -23px;
  position: relative;
`;

const SerchIcon = () => (
  <_SearchIcon>
    <FaSearch size={'12px'} />
  </_SearchIcon>
);

export default SerchIcon;

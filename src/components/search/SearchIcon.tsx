import styled from 'styled-components';
import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

const _SearchIcon = styled.div`
  display: inline-block;
  margin-right: -23px;
  position: relative;
`;

const SerchIcon = () => (
  <_SearchIcon>
    <FontAwesomeIcon icon={faSearch} fixedWidth size={'sm'} />
  </_SearchIcon>
);

export default SerchIcon;

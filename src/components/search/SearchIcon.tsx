import styled from 'styled-components';
import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

const FAIcon = ({ icon }): JSX.Element => <FontAwesomeIcon icon={icon} />;

const SearchIcon = styled.div`
  display: inline-block;
  margin-right: -23px;
  position: relative;
`;

export default () => {
  return (
    <SearchIcon>
      <FAIcon icon={faSearch} />
    </SearchIcon>
  );
};

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const _SearchIcon = styled.div`
  display: inline-block;
  margin-right: -23px;
  position: relative;
`;

const SerchIcon = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  });
  return (
    visible && (
      <_SearchIcon>
        <FontAwesomeIcon icon={faSearch} fixedWidth size={'sm'} />
      </_SearchIcon>
    )
  );
};

export default SerchIcon;

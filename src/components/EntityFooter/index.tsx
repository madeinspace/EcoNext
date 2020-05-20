import * as React from 'react';
import styled from 'styled-components';
import { idlogo } from '../../utils';

const Footer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [source] auto [idlogo];
  border-top: 1px solid lightgray;
  p {
    color: #a2a2a2;
  }

  a {
    color: #a2a2a2;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: #a2a2a2;
    }
  }
  &:hover {
    p,
    a {
      color: #757575;
    }
  }
`;
const DataSourceText = styled.div`
  line-height: 14px;
  padding: 10px;

  display: flex;
  align-items: flex-end;
  grid-column: source;
  p {
    font-size: 11px;
    margin: 0;
  }
`;

const Logo = styled.img`
  background-repeat: no-repeat;
  margin: 0;
  width: 112px;
  padding: 10px;
  align-self: end;
  justify-self: end;
  grid-column: idlogo;
`;

export const EntityFooter = ({ Source }) => {
  return (
    <Footer>
      <DataSourceText>
        <Source />
      </DataSourceText>
      <Logo src={idlogo} alt=".id logo" />
    </Footer>
  );
};

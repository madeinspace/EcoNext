import * as React from 'react';
import styled from 'styled-components';
import { FooterData } from './FooterData';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

const Footer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [source] auto [idlogo];
  border-top: 1px solid lightgray;
  p {
    color: ${variables.graySligtlyLighter};
  }

  a {
    color: ${variables.graySligtlyLighter};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${variables.graySligtlyLighter};
    }
  }
  &:hover {
    p,
    a {
      color: ${variables.gray};
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

export const ChartFooter: React.SFC<FooterData> = ({ dataSource, logoUrl }) => {
  return (
    <Footer>
      <DataSourceText>{dataSource}</DataSourceText>
      <Logo src={logoUrl} alt=".id logo" />
    </Footer>
  );
};

import * as React from 'react';
import styled from 'styled-components';
import { FooterData } from './FooterData';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

const Footer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [source] auto [idlogo];
  a {
    color: ${variables.linkColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${variables.linkColor};
    }
  }
`;
const DataSourceText = styled.div`
  line-height: 14px;
  padding: 8px;
  font-size: 11px;
  display: flex;
  align-items: flex-end;
  grid-column: source;
`;

const Logo = styled.div`
  background-repeat: no-repeat;
  height: 54px;
  margin-right: 20px;
  padding: 5px;
  grid-column: idlogo;
`;

export const ChartFooter: React.SFC<FooterData> = ({ dataSource, logoUrl }) => {
  return (
    <Footer>
      <DataSourceText>{dataSource}</DataSourceText>
      <Logo>
        <img src={logoUrl} alt=".id logo" />
      </Logo>
    </Footer>
  );
};

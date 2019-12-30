import * as React from 'react';
import styled from 'styled-components';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

interface IFooterData {
  dataSource: JSX.Element;
  logoUrl: string;
}

const Footer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [source] auto [idlogo];
  a {
    color: ${variables['linkColor']};
    text-decoration: none;
    border-bottom: 1px solid ${variables['linkColor']};
    &:visited {
      color: ${variables['linkColor']};
    }
  }
`;
const DataSourceText = styled.div`
  line-height: 14px;
  padding: 8px;
  font-size: 12px;
  grid-column: source;
`;

const Logo = styled.div`
  background-repeat: no-repeat;
  height: 41px;
  margin-right: 20px;
  grid-column: idlogo;
`;

export const ChartFooter: React.SFC<IFooterData> = ({ dataSource, logoUrl }) => {
  return (
    <Footer>
      <DataSourceText>{dataSource}</DataSourceText>
      <Logo>
        <img src={logoUrl} />
      </Logo>
    </Footer>
  );
};

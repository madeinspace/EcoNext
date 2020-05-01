import React, { useContext } from 'react';
import styled from 'styled-components';
import groupBy from 'lodash/groupBy';
import _ from 'lodash';
import Link from '../components/Link';
import { FooterRow, SiteMapGrid } from './grid';
import { ClientContext } from '../utils/context';

const SiteMapHeader = styled.h1`
  margin: 0;
  padding-bottom: 15px;
  padding-top: 1em;
  font-size: 26px;
  border-bottom: 1px solid #d2d2d2;
`;
const Subtitle = styled.h2`
  color: #70b859;
  font-size: 20px;
  padding-top: 1em;
`;

const FooterContents = styled.div`
  grid-area: footer;
  margin: 0;
`;

const SitemapWrapper = styled.div`
  background-color: #f2f2f2;
  margin-top: 40px;
  padding-bottom: 1.5em;
`;

const ProductItems = styled.ul`
  margin: 0;
  list-style: none;
  grid-area: footer;
`;
const ProductItem = styled.li`
  position: relative;
  line-height: 30px;
  vertical-align: middle;
  text-decoration: none;
  text-transform: lowercase;
  font-size: 16px;
  a {
    text-decoration: none;
  }
  &.app-1 {
    a {
      color: #cb2c30;
    }
  }
  &.app-2 {
    a {
      color: #caae01;
    }
  }
  &.app-3 {
    a {
      color: #3b6e8f;
    }
  }
  &.app-4 {
    a {
      color: #70b859;
    }
  }
`;

const GroupName = styled.h2`
  font-size: 11px;
  letter-spacing: 0.1em;
  margin-bottom: 5px;
  margin-top: 5px;
  text-transform: uppercase;
  line-height: 20px;
  color: #70b859;
`;

const PageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const PageItem = styled.li`
  font-size: 11px;
  line-height: 16px;
`;
const DisabledLink = styled(PageItem)`
  color: #bbb;
  text-decoration: none;
  cursor: default;
`;

const StyledLink = styled(Link)`
  font-size: 11px;
  line-height: 16px;
  text-decoration: none;
  color: #757575;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;

const ColumnGroup = styled.div`
  margin-top: 10px;
`;

const Column = styled.div`
  grid-area: ${props => `col${props.col}`};
`;

const buildSiteMap = (clientAlias, columns, navigation) => {
  return columns.map((column, i) => {
    return (
      <Column key={i} col={i + 1}>
        {column.map((groups, i) => {
          const pageIDs = groups.Pages.split(',').map(Number);
          const pages = navigation.filter(node => pageIDs.includes(node.PageID));
          return (
            <ColumnGroup key={i}>
              <GroupName>{groups.GroupName}</GroupName>
              <PageList>
                {pages.map((page, i) => {
                  const { Alias, PageID, MenuTitle, Disabled } = page;
                  return (
                    <React.Fragment key={PageID}>
                      {Disabled ? (
                        <DisabledLink>{MenuTitle}</DisabledLink>
                      ) : (
                        <li>
                          <StyledLink href={`/${clientAlias}/${Alias}/`}>{MenuTitle}</StyledLink>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </PageList>
            </ColumnGroup>
          );
        })}
      </Column>
    );
  });
};

const SiteMap = () => {
  const { clientProducts, clientPages, sitemapGroups, LongName, clientAlias } = useContext(ClientContext);

  const columns = _.values(groupBy(sitemapGroups, 'ColNumber'));
  return (
    <SitemapWrapper id="sitemap">
      <FooterRow>
        <FooterContents>
          <SiteMapHeader>{LongName}</SiteMapHeader>
        </FooterContents>
      </FooterRow>
      <FooterRow>
        <FooterContents>
          <Subtitle>economic profile</Subtitle>
        </FooterContents>
      </FooterRow>
      <SiteMapGrid>{buildSiteMap(clientAlias, columns, clientPages)}</SiteMapGrid>
      <FooterRow>
        <ProductItems>
          {clientProducts
            .filter(p => p.AppID != 4)
            .map((product, i) => {
              return (
                <ProductItem key={i} className={`app-${product.AppID}`}>
                  <a key={i} href={`https://${product.SubDomainName}.id.com.au/${clientAlias}`}>
                    {product.FullName}
                  </a>
                </ProductItem>
              );
            })}
        </ProductItems>
      </FooterRow>
    </SitemapWrapper>
  );
};

export default SiteMap;

import { ClientContext } from '../../utils/context';
import { useContext } from 'react';
import { groupBy } from 'lodash';
import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';
import Link from '../../components/Link';
const ColumnGroup = styled.div`
  margin-top: 10px;
  margin-right: 40px;
`;
const SiteMapContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const GroupName = styled.h2`
  font-size: 14px;
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
  font-size: 12px;
  line-height: 18px;
`;
const DisabledLink = styled(PageItem)`
  color: #bbb;
  text-decoration: none;
  cursor: default;
`;

const StyledLink = styled(Link)`
  font-size: 12px;
  line-height: 18px;
  text-decoration: none;
  color: #757575;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;
const Column = styled.div`
  /* grid-area: ${props => `col${props.col}`}; */
`;
const buildSiteMap = (clientAlias, columns, navigation) => {
  const col1 = [columns[0][0], columns[0][1], columns[1][0], columns[1][1], columns[2][0], columns[2][1]];
  const col2 = [columns[2][2], columns[3][0], columns[3][1], columns[4][1]];
  const col3 = [columns[4][0], columns[4][2], columns[5][2], columns[5][0], columns[5][1]];
  const finalCol = [col1, col2, col3];
  return finalCol.map((column, i) => {
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
  const { clientPages, sitemapGroups, clientAlias } = useContext(ClientContext);
  const columns = _.values(groupBy(sitemapGroups, 'ColNumber'));
  return <SiteMapContainer>{buildSiteMap(clientAlias, columns, clientPages)}</SiteMapContainer>;
};

export default SiteMap;

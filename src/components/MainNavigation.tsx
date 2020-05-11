import React, { useContext } from 'react';
import Link from '../components/Link';
import styled from 'styled-components';
import _ from 'lodash';
import groupBy from 'lodash/groupBy';
import OtherResources from './OtherRessources';
import { ClientContext, PageContext } from '../utils/context';
const MainNav = styled.div``;

const buildIsCurrent = currentPageAlias => navigationNode => navigationNode.Alias == currentPageAlias;

const buildMenuGroups = navNodes => groupBy(navNodes, 'GroupName');

const validateGroupName = groupname => groupname !== '' && groupname !== 'Undefined';

const buildMenu = (handle, clientAlias, navigationNodes, ParentPageID = 0, WebID = 10): JSX.Element[] => {
  const groupedNavigation = groupBy(navigationNodes, 'ParentPageID');
  const topNavNodes = groupedNavigation[ParentPageID];
  const menuGroups = buildMenuGroups(topNavNodes);
  const isCurrent = buildIsCurrent(handle);

  return _.map(menuGroups, (group, groupName) => (
    <React.Fragment key={groupName}>
      {validateGroupName(groupName) && <GroupName>{groupName}</GroupName>}
      {group.map((topNode, i) => {
        const { Disabled, MenuTitle, Alias: pageAlias, PageID, ParentPageID } = topNode;
        const isParent = PageID in groupedNavigation && ParentPageID === 0;
        const childIsCurrent = _.some(groupedNavigation[PageID], isCurrent);
        const isActive = childIsCurrent || pageAlias === handle;

        return (
          <MenuItem key={i} className={isParent && 'parent'}>
            {Disabled ? (
              <DisabledLink>{MenuTitle}</DisabledLink>
            ) : (
              <StyledLink
                className={isActive && 'active'}
                href={`/${clientAlias}/${pageAlias === 'home' ? '' : pageAlias}`}
              >
                {MenuTitle}
              </StyledLink>
            )}
            {isParent && <SubMenu>{buildMenu(handle, clientAlias, navigationNodes, PageID)}</SubMenu>}
          </MenuItem>
        );
      })}
    </React.Fragment>
  ));
};

const MainNavigation = (): JSX.Element => {
  const { clientPages, clientAlias } = useContext(ClientContext);
  const data = useContext(PageContext);
  const { handle } = data;

  return (
    <MainNav>
      <Menu>
        {buildMenu(handle, clientAlias, clientPages)}
        <GroupName>Other resources</GroupName>
        {OtherResources.map((link, i) => (
          <MenuItem key={i}>
            <HardCodedLink href={link.url} target="_blank" rel="noopener" title={link.displayText}>
              {link.displayText}
            </HardCodedLink>
          </MenuItem>
        ))}
      </Menu>
    </MainNav>
  );
};

export default MainNavigation;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #757575;
  display: block;
  padding: 3.5px 7px;
  &.active,
  :hover {
    background-color: #70b859;
    color: white;
  }
`;

const HardCodedLink = styled.a`
  text-decoration: none;
  color: #757575;
  display: block;
  padding: 3.5px 7px;
  &.active,
  :hover {
    background-color: #70b859;
    color: white;
  }
`;

const DisabledLink = styled.div`
  padding: 3.5px 7px;
  color: #bbb;
  text-decoration: none;
  cursor: default;
  /* :hover {
    background-color: #70b859;
    color: white;
  } */
`;

const SubMenu = styled.ul`
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms ease;
  position: absolute;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  width: 280px;
  padding: 4px;
  top: 0;
  left: 100%;
  z-index: 1000;
  margin-left: -1px;
  padding: 0;
`;

const MenuItem = styled.li`
  font-size: 14px;
  line-height: 1.2;
  display: block;
  color: #757575;
  position: relative;

  &.parent {
    a,
    div {
      cursor: pointer;
      &::after {
        border-style: solid;
        border-width: 0.12em 0.12em 0 0;
        content: '';
        height: 0.55em;
        left: 0.15em;
        position: relative;
        top: 0.25em;
        transform: rotate(45deg);
        vertical-align: top;
        width: 0.55em;
        float: right;
      }
    }
  }

  &:hover {
    ${SubMenu} {
      visibility: visible;
      opacity: 1;
      ${DisabledLink} {
        cursor: default;
      }
      a,
      div {
        &::after {
          border: none;
          content: '';
        }
      }
    }
  }
`;

const GroupName = styled(MenuItem)`
  padding: 3.5px 7px;
  font-size: 16px;
  font-weight: 700;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  & > ${GroupName} {
    color: #70b859;
    border-top: solid 1px #bbb;
    padding-top: 0.5em;
    margin-top: 0.5em;
  }
`;

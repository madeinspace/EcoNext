import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from './Link';
import { ClientContext, PageContext } from '../utils/context';

const Heading = styled.h1`
  width: 100%;
  font-size: 23px;
  margin-bottom: 20px;
`;

const ChildrenMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #757575;
  padding: 0px;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
  line-height: 20px;
  &.active,
  :hover {
    border-bottom: 2px solid #70b859;
  }
`;

const ChildrenList = styled.ul`
  list-style: none;
`;

const DisabledLink = styled.a`
  padding: 0px;
  margin-bottom: 10px;
  color: #bbb;
  text-decoration: none;
  line-height: 20px;
  cursor: default;
  :hover {
    border-bottom: 2px solid #70b859;
  }
`;

const ChildrenMenu = () => {
  const { clientAlias, clientPages } = useContext(ClientContext);
  const { handle } = useContext(PageContext);
  const currentPageNode = clientPages.find(node => node.Alias === handle);
  const currentParentPageID = (currentPageNode && currentPageNode.PageID) || 0;
  const childrenPages = clientPages.filter(node => node.ParentPageID === currentParentPageID);

  const children = childrenPages.map(({ Disabled, MenuTitle, Alias }) => (
    <li key={Alias}>
      {Disabled ? (
        <DisabledLink>{MenuTitle}</DisabledLink>
      ) : (
        <StyledLink href={`/${clientAlias}/${Alias}`} prefetch="false" className={handle === Alias && 'active'}>
          {MenuTitle}
        </StyledLink>
      )}
    </li>
  ));

  return (
    <ChildrenMenuContainer>
      <Heading>Select a topic</Heading>
      <ChildrenList>{children}</ChildrenList>
    </ChildrenMenuContainer>
  );
};

export default ChildrenMenu;

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from './Link';
import { ClientContext, PageContext } from '../utils/context';

const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/variables.scss`);
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
  color: ${variables.gray};
  padding: 0px;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
  line-height: 20px;
  &.active,
  :hover {
    border-bottom: 2px solid ${variables.colorEconomy};
  }
`;

const ChildrenList = styled.ul`
  list-style: none;
`;

const DisabledLink = styled(StyledLink)`
  color: ${variables.grayLight};
  cursor: default;
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

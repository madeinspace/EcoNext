import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from './Link';
import { ClientContext, PageContext } from '../utils/context';

const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/variables.scss`);

const ChildrenMenu = () => {
  const { clientAlias, clientPages } = useContext(ClientContext);
  const { handle } = useContext(PageContext);
  const currentPageNode = clientPages.find(node => node.Alias === handle);
  const currentParentPageID = (currentPageNode && currentPageNode.PageID) || 0;

  const children = clientPages
    .filter(node => node.ParentPageID === currentParentPageID)
    .map(({ Disabled, MenuTitle, Alias }) => (
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
      <ul>{children}</ul>
    </ChildrenMenuContainer>
  );
};

export default ChildrenMenu;

const Heading = styled.h2`
  width: 100%;
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
  padding: 0px 12px 0 12px;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
  &.active,
  :hover {
    border-bottom: 2px solid ${variables.colorEconomy};
  }
`;

const DisabledLink = styled.a`
  padding: 0px 12px 0 12px;
  margin-bottom: 10px;
  color: ${variables.grayLight};
  text-decoration: none;
  cursor: default;
  :hover {
    border-bottom: 2px solid ${variables.colorEconomy};
  }
`;

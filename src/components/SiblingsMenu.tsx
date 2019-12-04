import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import { ClientContext, PageContext } from '../utils/context';

const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/variables.scss`);

const SiblingsMenu = () => {
  const { clientAlias, clientPages } = useContext(ClientContext);
  const { handle } = useContext(PageContext);

  const currentPageNode = clientPages.find(node => node.Alias === handle);
  const currentParentPageID = (currentPageNode && currentPageNode.ParentPageID) || 0;

  const siblings = clientPages
    .filter(node => node.ParentPageID === currentParentPageID)

    .map(({ Disabled, MenuTitle, Alias }) => (
      <React.Fragment key={Alias}>
        {Disabled ? (
          <DisabledLink>{MenuTitle}</DisabledLink>
        ) : (
          <StyledLink href={`/${clientAlias}/${Alias}`} prefetch="false" className={handle === Alias && 'active'}>
            {MenuTitle}
          </StyledLink>
        )}
      </React.Fragment>
    ));

  return <SiblingsMenuContainer id="siblings-nav">{siblings}</SiblingsMenuContainer>;
};

export default SiblingsMenu;

const SiblingsMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${variables.grayLighter};
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

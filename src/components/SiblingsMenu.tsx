import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from '../components/Link';
import { ClientContext, PageContext } from '../utils/context';

const SiblingsMenu = () => {
  const { clientAlias, clientPages } = useContext(ClientContext);
  const { handle } = useContext(PageContext);

  const currentPageNode = clientPages.find(node => node.Alias === handle);
  const currentParentPageID = (currentPageNode && currentPageNode.ParentPageID) || 0;
  const siblingPages = clientPages.filter(node => node.ParentPageID === currentParentPageID);

  const siblings = siblingPages.map(({ Disabled, MenuTitle, Alias }) => (
    <React.Fragment key={Alias}>
      {Disabled ? (
        <DisabledLink>{MenuTitle}</DisabledLink>
      ) : (
        <StyledLink href={`/${clientAlias}/${Alias.toLowerCase()}`} className={handle === Alias && 'active'}>
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
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #757575;
  padding: 0px 12px 0 12px;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
  line-height: 27px;
  &.active,
  :hover {
    border-bottom: 2px solid #70b859;
  }
`;

const DisabledLink = styled.a`
  padding: 0px 12px 0 12px;
  margin-bottom: 10px;
  color: #bbb;
  text-decoration: none;
  line-height: 27px;
  border-bottom: 2px solid transparent;
  cursor: default;
  :hover {
    /* border-bottom: 2px solid #70b859; */
  }
`;

import React from 'react';
import { pathParts } from '../utils/';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from '../components/Link';

const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/variables.scss`);

const SiblingsMenu = ({ navigationNodes, clientAlias }) => {
  const { pageAlias: currentPageAlias } = pathParts(useRouter().pathname);
  const currentPageNode = navigationNodes.find(
    node => node.Alias === currentPageAlias
  );
  const currentParentPageID =
    (currentPageNode && currentPageNode.ParentPageID) || 0;
  const siblings = navigationNodes
    .filter(node => {
      return node.ParentPageID === currentParentPageID;
    })
    .map((node, i) => {
      const { Disabled, MenuTitle, Alias } = node;
      return (
        <React.Fragment key={i}>
          {Disabled ? (
            <DisabledLink>{MenuTitle}</DisabledLink>
          ) : (
            <StyledLink
              href={`/${clientAlias}/${Alias}`}
              className={currentPageAlias === Alias && 'active'}
            >
              {MenuTitle}
            </StyledLink>
          )}
        </React.Fragment>
      );
    });

  return <SiblingsMenuContainer>{siblings}</SiblingsMenuContainer>;
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

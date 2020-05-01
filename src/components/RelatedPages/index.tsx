import styled from 'styled-components';

import { useContext } from 'react';
import { ClientContext, PageContext } from '../../utils/context';
import MonolithOrNextLink from '../Link';
import { FaChevronRight } from 'react-icons/fa';

const StyledCTA = styled.div`
  display: grid;
  grid-template-areas: 'text . links';
  grid-template-columns: 65% 5% 30%;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 20px 0;
  h3 {
    color: #009a44;
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    grid-area: links;
    margin-bottom: 0;
    li {
      line-height: 20px;
    }
    a {
      color: #757575;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const IconBase = styled.span`
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

const RelatedPagesCTA = () => {
  const { clientAlias } = useContext(ClientContext);
  const {
    pageData: { RelatedPages },
  } = useContext(PageContext);

  if (!RelatedPages || RelatedPages.length === 0) return null;

  return (
    <StyledCTA>
      <h3>To continue building your economic story go to...</h3>
      <IconBase>
        <FaChevronRight />
      </IconBase>
      <ul>
        {RelatedPages.map(({ Alias, MenuTitle }) => (
          <li key={Alias}>
            <MonolithOrNextLink href={`/${clientAlias}/${Alias}`}>{MenuTitle}</MonolithOrNextLink>
          </li>
        ))}
      </ul>
    </StyledCTA>
  );
};

export default RelatedPagesCTA;

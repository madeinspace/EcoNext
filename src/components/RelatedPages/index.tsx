import styled from 'styled-components';

import { useContext } from 'react';
import Link from 'next/link';
import { ClientContext, PageContext } from '../../utils/context';

const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

const StyledCTA = styled.div`
  display: grid;
  grid-template-areas: 'text . links';
  grid-template-columns: 65% 5% 30%;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  h3 {
    color: ${variables.colorEconomyDark};
    margin-bottom: 0;
    &::after {
      font-family: 'id-icons';
      font-size: 28px;
      line-height: 0;
      content: '\\E603';
      float: right;
      margin-top: 15px;
    }
  }
  ul {
    list-style: none;
    grid-area: links;
    margin-bottom: 0;
    a {
      color: ${variables.gray};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const RelatedPagesCTA = () => {
  const { clientAlias } = useContext(ClientContext);
  const { pageData } = useContext(PageContext);

  const { RelatedPages } = pageData;

  if (!RelatedPages || RelatedPages.length === 0) return null;

  return (
    <StyledCTA>
      <h3>To continue building your economic story go to...</h3>
      <ul>
        {RelatedPages.map(({ Alias, MenuTitle }) => (
          <li key={Alias}>
            <Link href={`${clientAlias}/${Alias}`}>
              <a>{MenuTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledCTA>
  );
};

export default RelatedPagesCTA;

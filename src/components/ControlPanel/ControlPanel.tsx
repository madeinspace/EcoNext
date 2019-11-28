import * as React from 'react';
import { ResetButton } from '../Actions';
import SelectDropdown from './SelectDropdown';
import styled from 'styled-components';
import Sticky from '@wicked_query/react-sticky';
import Router from 'next/router';
import qs from 'qs';
import { PageContext, ClientContext } from '../../utils/context';

const StyledControlPanel = styled.div`
  align-items: end;
  background: #595959;
  color: white;

  /* use flex as a fallback for older browsers */
  display: flex;
  display: grid;
  grid-auto-columns: minmax(min-content, max-content);
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 15px;
  position: relative;
  z-index: 2;
`;

const ControlPanel: React.SFC<{}> = () => {
  const { ClientAlias } = React.useContext(ClientContext);
  const { handle, toggles } = React.useContext(PageContext);

  const setQuery = (key, value) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query[key] = value;
    Router.push({
      pathname: `/${ClientAlias}/${handle}`,
      query,
    });
  };

  const handleReset = () =>
    Router.push({
      pathname: `/${ClientAlias}/${handle}`,
      query: {},
    });

  const displayToggles = toggles.reduce((acc, { list }) => {
    return acc || (list && list.length > 1);
  }, false);

  if (!displayToggles) return null;

  return (
    <Sticky>
      <StyledControlPanel>
        {toggles.map(({ title, value, key, list }) => {
          return (
            list.length > 1 && (
              <SelectDropdown
                key={key}
                title={title}
                value={value}
                handleChange={e => setQuery(key, e.target.value)}
                list={list}
              />
            )
          );
        })}
        <ResetButton onClick={handleReset} />
      </StyledControlPanel>
    </Sticky>
  );
};

export default ControlPanel;

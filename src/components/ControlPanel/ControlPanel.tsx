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
  const { clientAlias } = React.useContext(ClientContext);
  const { handle, filterToggles } = React.useContext(PageContext);

  const setQuery = (key, value) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    query[key] = value;
    Router.push({
      pathname: `/${clientAlias}/${handle}`,
      query,
    });
  };

  const handleReset = () =>
    Router.push({
      pathname: `/${clientAlias}/${handle}`,
      query: {},
    });

  const displayToggles = filterToggles.reduce((acc, { list, hidden }) => {
    return acc || (list && list.length > 1 && !hidden);
  }, false);

  if (!displayToggles) return null;

  return (
    <Sticky>
      <StyledControlPanel>
        {filterToggles.map(({ title, value, key, list, hidden }) => {
          if (list.length === 1 || hidden) {
            // this toggle only has one item, so we don't need to display a dropdown
            return null;
          }

          if (list.length > 1) {
            // this toggle has items, and is therefore a dropdown list
            return (
              !hidden && (
                <SelectDropdown
                  key={key}
                  title={title}
                  value={value}
                  handleChange={e => setQuery(key, e.target.value)}
                  list={list}
                />
              )
            );
          }

          // if we've got this far, the toggle exists but has no 'list' items
          // this might mean it's an input field
          // this approach might need to change in future if we find more complex toggles

          return <input key={key} onBlur={e => setQuery(key, e.target.value)} value={value} />;
        })}
        <ResetButton onClick={handleReset} />
      </StyledControlPanel>
    </Sticky>
  );
};

export default ControlPanel;

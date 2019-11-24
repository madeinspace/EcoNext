import * as React from 'react';
import { ResetButton } from '../Actions';
import SelectDropdown from './SelectDropdown';
import styled from 'styled-components';
import Sticky from '@wicked_query/react-sticky';
import Router from 'next/router';
import qs from 'qs';
import { Context } from '../../utils/context';

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

interface Selectable {
  ID: number;
  Name: string;
}

interface Dropdown {
  list: Selectable[];
  title: string;
  handleChange?: (e: any) => void;
  value: number;
  hidden?: boolean;
}

interface IControlPanelProps {
  industry?: boolean;
  benchmark?: boolean;
  sex?: boolean;
}

const ControlPanel: React.SFC<IControlPanelProps> = ({ industry, benchmark, sex }) => (
  // these props determine whether to show the corresponding dropdowns
  // note that `area` will always appear if clientAreas > 1 (eg we are viewing an RDA client)
  <Context.Consumer>
    {({ clientAlias, handle, filters, clientAreas, Industries, BenchmarkAreas, Sexes }) => {
      // bail early if none of the props are true
      if (!(industry || benchmark || sex) && clientAreas.length === 1) return null;

      const Benchmarks = [...Industries, ...BenchmarkAreas];

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

      const { Indkey, IGBMID, Sex, WebID } = filters;

      return (
        <Sticky>
          <StyledControlPanel>
            {clientAreas.length > 1 && (
              <SelectDropdown
                title="Current area:"
                value={WebID}
                handleChange={e => setQuery('WebID', e.target.value)}
                list={clientAreas || []}
              />
            )}
            {industry && (
              <SelectDropdown
                title="Current industry:"
                value={Indkey}
                handleChange={e => setQuery('Indkey', e.target.value)}
                list={Industries.filter(({ ID }) => ID !== +IGBMID) || []}
              />
            )}
            {benchmark && (
              <SelectDropdown
                title="Current benchmark:"
                value={IGBMID}
                handleChange={e => setQuery('IGBMID', e.target.value)}
                list={Benchmarks.filter(({ ID }) => ID !== +Indkey) || []}
              />
            )}
            {sex && (
              <SelectDropdown
                title="Gender:"
                value={Sex}
                handleChange={e => setQuery('Sex', e.target.value)}
                list={Sexes || []}
              />
            )}
            <ResetButton onClick={handleReset} />
          </StyledControlPanel>
        </Sticky>
      );
    }}
  </Context.Consumer>
);

export default ControlPanel;

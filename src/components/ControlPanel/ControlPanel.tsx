import * as React from 'react';
import { ResetButton } from '../Actions';
import SelectDropdown from './SelectDropdown';
import styled from 'styled-components';
import Sticky from '@wicked_query/react-sticky';

const _ControlPanel = styled.div`
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
  dropdowns: Dropdown[];
  onReset: () => void;
}

const ControlPanel: React.SFC<IControlPanelProps> = ({ dropdowns, onReset }) => {
  return (
    <Sticky>
      <_ControlPanel>
        {dropdowns.map(
          (dropdown: Dropdown) => !dropdown.hidden && <SelectDropdown key={dropdown.value} {...dropdown} />,
        )}
        <ResetButton onReset={onReset} />
      </_ControlPanel>
    </Sticky>
  );
};

export default ControlPanel;

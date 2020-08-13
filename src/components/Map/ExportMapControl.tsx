import * as React from 'react';
import styled from 'styled-components';
import { FaFileExport } from 'react-icons/fa';

interface IExportMapControlProps {
  handleClick: () => void;
}

export default function ExportMapControl(props: IExportMapControlProps) {
  const { handleClick } = props;
  return (
    <ExportControl>
      <button type="button" onClick={handleClick}>
        <FaFileExport color={'#757575'} size={'18px'} />
      </button>
    </ExportControl>
  );
}

const ExportControl = styled.div`
  position: absolute;
  z-index: 800;
  top: 80px;
  left: 10px;
  box-shadow: none;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  button {
    width: 30px;
    height: 30px;
    font-size: 18px;
    padding: 5px;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #f4f4f4;
    }
  }
`;

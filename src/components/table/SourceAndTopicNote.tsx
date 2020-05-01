import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';

const DataTableSource = styled.div`
  position: relative;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid #d2cfcf;
  padding: 10px;

  p {
    color: #a2a2a2;
    font-size: 11px;
    margin: 0;
  }
  a {
    color: #a2a2a2;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: #a2a2a2;
    }
  }
  &:hover {
    p,
    a {
      color: #757575;
    }
  }
`;

const DataNote = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #a2a2a2;
  display: block;
  font-size: 11px;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: #a2a2a2;
  }
`;

export const SourceAndTopicNotes = ({ source, anchorName, clientAlias }) => {
  return (
    !_.isEmpty(source) && (
      <DataTableSource>
        <div>
          {source}
          {anchorName && (
            <DataNote
              target="_blank"
              rel="noopener"
              title="Click for more information"
              href={`https://economy.id.com.au/${clientAlias}/topic-notes#${anchorName}`}
            >
              Please refer to specific data notes for more information
            </DataNote>
          )}
        </div>
      </DataTableSource>
    )
  );
};

export default SourceAndTopicNotes;

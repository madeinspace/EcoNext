import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

const DataTableSource = styled.div`
  position: relative;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid #d2cfcf;
  padding: 10px;

  p {
    color: ${variables.graySligtlyLighter};
    font-size: 11px;
    margin: 0;
  }
  a {
    color: ${variables.graySligtlyLighter};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${variables.graySligtlyLighter};
    }
  }
  &:hover {
    p,
    a {
      color: ${variables.gray};
    }
  }
`;

const DataNote = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${variables.graySligtlyLighter};
  display: block;
  font-size: 11px;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${variables.graySligtlyLighter};
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

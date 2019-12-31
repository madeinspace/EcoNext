import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../styles/variables.scss`);

const DataTableSource = styled.div`
  color: #6a6a6a;
  position: relative;
  font-size: 11px;
  line-height: 14px;
  padding: 10px 6px 5px 6px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid #d2cfcf;
  a {
    color: ${variables.grayDark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:visited {
      color: ${variables.grayDark};
    }
  }
`;

const DataNote = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${variables.grayDark};
  display: block;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${variables.grayDark};
  }
`;

export const SourceAndTopicNotes = ({ source, anchorName, clientAlias }) =>
  !_.isEmpty(source) && (
    <DataTableSource>
      <div>
        {source}
        <DataNote
          target="_blank"
          rel="noopener"
          title="Click for more information"
          href={`https://economy.id.com.au/${clientAlias}/topic-notes#${anchorName}`}
        >
          Please refer to specific data notes for more information
        </DataNote>
      </div>
    </DataTableSource>
  );

export default SourceAndTopicNotes;

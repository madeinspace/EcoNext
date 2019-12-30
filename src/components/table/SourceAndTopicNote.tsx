import * as React from 'react';
import * as _ from 'lodash';

export const SourceAndTopicNotes = ({ source, anchorName, clientAlias }) =>
  !_.isEmpty(source) && (
    <div className="dataTableSource">
      <div>{source}</div>
      <div className="dataNotes">
        <a
          className="tableFooterNotes"
          target="_blank"
          rel="noopener"
          title="Click for more information"
          href={`https://economy.id.com.au/${clientAlias}/topic-notes#${anchorName}`}
        >
          Please refer to specific data notes for more information
        </a>
      </div>
    </div>
  );

export default SourceAndTopicNotes;

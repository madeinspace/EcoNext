import React from 'react';

import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer } from '../../styles/MainContentStyles';

const PageHeader = ({ children, handleExport }) => (
  <EntityContainer>
    <TitleContainer>{children}</TitleContainer>
    <Actions>
      <Share />
      <ExportPage
        onExport={e => handleExport()}
        exportOptions={{
          formats: [{ displayText: 'Word' } /*, { name: "PDF" }*/],
        }}
      />
    </Actions>
  </EntityContainer>
);

export default PageHeader;

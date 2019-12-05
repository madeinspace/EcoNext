import React, { useContext } from 'react';

import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer, MainTitle, SubTitle } from '../../styles/MainContentStyles';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../utils/context';
import payload from '../../utils/fecthPageReport/ReportPayload';
import fetchPageReport from '../../utils/fecthPageReport';

const handlePageExport = payload => {
  fetchPageReport(payload);
};

const PageHeader = () => {
  const { LongName } = useContext(ClientContext);
  const { pageData, filterToggles } = useContext(PageContext);
  const { SubTitle: pageSubTitle } = pageData;
  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);

  return (
    <EntityContainer>
      <TitleContainer>
        <MainTitle>{currentAreaName}</MainTitle>
        {pageSubTitle && <SubTitle>{pageSubTitle}</SubTitle>}
      </TitleContainer>
      <Actions>
        <Share />
        <ExportPage
          onExport={formatID => handlePageExport(payload({ formatID, LongName, pageSubTitle }))}
          exportOptions={{
            formats: [
              { id: 0, displayText: 'PDF' },
              { id: 1, displayText: 'WORD' },
            ],
          }}
        />
      </Actions>
    </EntityContainer>
  );
};

export default PageHeader;

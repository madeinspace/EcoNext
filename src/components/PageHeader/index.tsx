import React, { useContext } from 'react';

import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer, MainTitle, SubTitle } from '../../styles/MainContentStyles';
import getActiveToggle from '../../utils/getActiveToggle';
import { Context } from '../../utils/context';

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const handleExport = async currentAreaName => {
  const IDReportRequest = {
    FileName: `Population - ${currentAreaName}`,
    Urls: [
      {
        Title: `Population - ${currentAreaName}`,
        url: window.location.href,
      },
    ],
    Action: 0,
    EmailAddress: 'fabrice@id.com.au',
  };

  try {
    const data = await postData(
      'https://idreportserviceweb.azurewebsites.net/api/IDReportService/RequestReport/',
      IDReportRequest,
    ).then(res => {
      console.log('Report Ok: ', res);
    });
    console.log(`Page report request: Population - ${currentAreaName}`);
  } catch (error) {
    console.error(error);
  }
};

const PageHeader = () => {
  const { clientData, toggles, pageData } = useContext(Context);

  const { SubTitle: pageSubTitle } = pageData;

  const currentAreaName = getActiveToggle(toggles, 'WebID', clientData.LongName);

  return (
    <EntityContainer>
      <TitleContainer>
        <MainTitle>{currentAreaName}</MainTitle>
        {pageSubTitle && <SubTitle>{pageSubTitle}</SubTitle>}
      </TitleContainer>
      <Actions>
        <Share />
        <ExportPage
          onExport={e => handleExport(currentAreaName)}
          exportOptions={{
            formats: [{ displayText: 'PDF' } /*, { name: "PDF" }*/],
          }}
        />
      </Actions>
    </EntityContainer>
  );
};

export default PageHeader;

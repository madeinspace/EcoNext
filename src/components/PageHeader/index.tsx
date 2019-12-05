import React, { useContext } from 'react';

import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer, MainTitle, SubTitle } from '../../styles/MainContentStyles';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../utils/context';

const postData = async (url = '', payload = {}) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const handleExport = async ({ LongName, pageSubTitle }) => {
  const FileName = `Economy.id-${LongName}-${pageSubTitle}`;
  const Product = `Economy`;
  const Urls = [
    {
      Title: `${pageSubTitle}`,
      Url: window.location.href,
      Pdfoptions: [
        { PropertyName: 'VisibleElementIds', PropertyValue: 'main-content' },
        { PropertyName: 'InvisibleElementIds', PropertyValue: 'siblings-nav' },
        {
          PropertyName: 'UserStyleSheet',
          PropertyValue: `#content-wrapper{grid-template-columns:auto};#main-nav{grid-area:none; display:none};#main-content{grid-area:auto; margin 0 50px};.e-shad{box-shadow:none; border:1px solid lightgray}`,
        },
      ],
    },
  ];
  const Format = 0;
  const EmailAddress = '';

  const payload = {
    FileName,
    Product,
    Urls,
    Format,
    EmailAddress,
  };

  try {
    await postData('https://reportwebah.azurewebsites.net/api/IDReportService/PutReportRequest', payload).then(res => {
      console.log('Report Ok: ', res);
    });
    console.log(`Page report request: ${pageSubTitle} - ${LongName}`);
  } catch (error) {
    console.error(error);
  }
};

const PageHeader = () => {
  const { LongName } = useContext(ClientContext);
  const { pageData, filterToggles } = useContext(PageContext);
  console.log('pageData: ', pageData);

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
          onExport={e => handleExport({ LongName, pageSubTitle })}
          exportOptions={{
            formats: [{ displayText: 'PDF' } /*, { name: "PDF" }*/],
          }}
        />
      </Actions>
    </EntityContainer>
  );
};

export default PageHeader;

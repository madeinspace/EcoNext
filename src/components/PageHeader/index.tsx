import React, { useContext } from 'react';
import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer, MainTitle, SubTitle } from '../../styles/MainContentStyles';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../utils/context';

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
        <ExportPage />
      </Actions>
    </EntityContainer>
  );
};

export default PageHeader;

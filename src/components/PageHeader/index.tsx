import React, { useContext } from 'react';
import { Actions, Share, ExportPage } from '../Actions';
import { TitleContainer, EntityContainer, MainTitle, _SubTitle } from '../../styles/MainContentStyles';
import getActiveToggle from '../../utils/getActiveToggle';
import _ from 'lodash';
import { ClientContext, PageContext } from '../../utils/context';
import useEntityText from '../../utils/useEntityText';

const PageHeader = ({ children = null }) => {
  const { LongName } = useContext(ClientContext);
  const { filterToggles } = useContext(PageContext);
  const SubTitle = () => <_SubTitle>{useEntityText('SubTitle')}</_SubTitle>;
  const currentAreaName = getActiveToggle(filterToggles, 'WebID', LongName);

  return (
    <EntityContainer>
      <TitleContainer>
        <MainTitle>{currentAreaName}</MainTitle>
        <SubTitle />
      </TitleContainer>
      {children}
    </EntityContainer>
  );
};

export default PageHeader;

import React, { useContext } from 'react';
import ClientHeader from '../components/ClientHeader';
import SearchApp from '../components/search/_Search';
import MainNavigation from '../components/MainNavigation';
import { ContentRow } from '../components/grid';
import SiteMap from '../components/SiteMap';
import SharedFooter from '../components/SharedFooter';
import { IsDisabled } from '../utils/';
import DisabledPageWarning from '../components/DisabledPageWarning';
import { ClientContext, PageContext } from '../utils/context';
import { SidebarNav, SiteContent } from '../styles/MainContentStyles';
import ChildrenMenu from '../components/ChildrenMenu';
import LockIcon from '../components/LockIcon';

const ParentLandingPageLayout = ({ children = null }) => {
  const { clientAlias, clientID, clientPages, LongName, isLite } = useContext(ClientContext);
  const { handle } = useContext(PageContext);

  const logo = require(`../images/logos/${clientAlias}.png`);
  const isDisabled = IsDisabled(clientPages, handle);

  return (
    <>
      <SearchApp alias={clientAlias} clientID={clientID} prettyname={LongName} clientImage={logo} />
      <ClientHeader alias={clientAlias} prettyname={LongName} clientImage={logo} isLite={isLite} />
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={clientAlias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          <ChildrenMenu />
          <LockIcon />
          {isDisabled ? <DisabledPageWarning /> : children}
        </SiteContent>
      </ContentRow>
      <SiteMap alias={clientAlias} prettyname={LongName} />
      <SharedFooter />
    </>
  );
};

export default ParentLandingPageLayout;

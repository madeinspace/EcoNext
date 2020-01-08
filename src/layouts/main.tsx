import React, { useContext } from 'react';
import ClientHeader from '../components/ClientHeader';
import SearchApp from '../components/search/_Search';
import MainNavigation from '../components/MainNavigation';
import { ContentRow } from '../components/grid';
import SiteMap from '../components/SiteMap';
import SharedFooter from '../components/SharedFooter';
import SiblingsMenu from '../components/SiblingsMenu';
import { IsDisabled } from '../utils/';
import DisabledPageWarning from '../components/DisabledPageWarning';
import LockIcon from '../components/LockIcon';
import { SidebarNav, SiteContent } from '../styles/MainContentStyles';
import { ClientContext, PageContext } from '../utils/context';
import Head from 'next/head';
import SEO from '../utils/SEO';

const Layout = ({ children, Template = null }): JSX.Element => {
  if (Template) {
    return <Template />;
  }

  const { clientAlias, clientID, clientPages, LongName, clientLogo } = useContext(ClientContext);
  const { handle } = useContext(PageContext);
  const isDisabled = IsDisabled(clientPages, handle);

  return (
    <>
      <SEO />
      <SearchApp alias={clientAlias} clientID={clientID} prettyname={LongName} clientImage={clientLogo} />
      <ClientHeader />
      <ContentRow id="content-wrapper">
        <SidebarNav id="main-nav">
          <MainNavigation />
        </SidebarNav>
        <SiteContent id="main-content">{isDisabled ? <DisabledPageWarning /> : children}</SiteContent>
      </ContentRow>
      <SiteMap />
      <SharedFooter />
    </>
  );
};

export default Layout;

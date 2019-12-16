import React, { useContext } from 'react';
import ClientHeader from '../../components/ClientHeader';
import SearchApp from '../../components/search/_Search';
import MainNavigation from '../../components/MainNavigation';
import { ContentRow } from '../../components/grid';
import SiteMap from '../../components/SiteMap';
import SharedFooter from '../../components/SharedFooter';
import { ClientContext, PageContext } from '../../utils/context';
import { SidebarNav, SiteContent } from '../../styles/MainContentStyles';
import SEO from '../../utils/SEO';

const SignInPage = ({ children = null }) => {
  const { clientAlias, clientID, clientPages, LongName, isLite, clientLogo } = useContext(ClientContext);

  return (
    <>
      <SearchApp alias={clientAlias} clientID={clientID} prettyname={LongName} clientImage={clientLogo} />
      <ClientHeader />
      <ContentRow id="content-wrapper">
        <SidebarNav id="main-nav">
          <MainNavigation />
        </SidebarNav>
        <SiteContent id="main-content">{children}</SiteContent>
      </ContentRow>
      <SiteMap />
      <SharedFooter />
    </>
  );
};

export default SignInPage;

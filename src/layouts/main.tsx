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

const Layout = ({ children, Template = null }) => {
  if (Template) {
    return <Template />;
  }

  const { clientAlias, clientID, clientPages, LongName, isLite } = useContext(ClientContext);
  const { handle } = useContext(PageContext);

  const logo = require(`../images/logos/${clientAlias}.png`);
  const isDisabled = IsDisabled(clientPages, handle);

  return (
    <>
      <SearchApp alias={clientAlias} clientID={clientID} prettyname={LongName} clientImage={logo} />
      <ClientHeader />
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={clientAlias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          <SiblingsMenu />
          <LockIcon />
          {isDisabled ? <DisabledPageWarning /> : children}
        </SiteContent>
      </ContentRow>
      <SiteMap alias={clientAlias} prettyname={LongName} />
      <SharedFooter />
    </>
  );
};

export default Layout;

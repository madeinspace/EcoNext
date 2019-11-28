import React, { useContext } from 'react';
import ClientHeader from '../components/ClientHeader';
import SearchApp from '../components/search/_Search';
import MainNavigation from '../components/MainNavigation';
import styled from 'styled-components';
import { ContentRow } from '../components/grid';
import SiteMap from '../components/SiteMap';
import SharedFooter from '../components/SharedFooter';
import some from 'lodash/some';
import SiblingsMenu from '../components/SiblingsMenu';
import { IsDisabled } from '../utils/';
import DisabledPageWarning from '../components/DisabledPageWarning';
import { Secured, Unsecured } from '../styles/ui';
import { ClientContext, PageContext } from '../utils/context';
const IsLite = nodes => some(nodes, 'Disabled');

const SidebarNav = styled.div`
  grid-area: navigation;
`;

const SiteContent = styled.div`
  grid-area: content;
`;

const ParentLandingPageLayout = ({ children = null }) => {
  const { ClientAlias, clientID, clientPages, LongName } = useContext(ClientContext);
  const { handle, pageData } = useContext(PageContext);

  const logo = require(`../images/logos/${ClientAlias}.png`);
  const isDisabled = IsDisabled(clientPages, handle);
  const isSecure = pageData.IsSecure;

  return (
    <>
      <SearchApp alias={ClientAlias} clientID={clientID} prettyname={LongName} clientImage={logo} />
      <ClientHeader alias={ClientAlias} prettyname={LongName} clientImage={logo} isLite={IsLite(clientPages)} />
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={ClientAlias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          Select a topic
          <SiblingsMenu />
          {isSecure ? <Secured /> : <Unsecured />}
          {isDisabled ? <DisabledPageWarning /> : children}
        </SiteContent>
      </ContentRow>
      <SiteMap alias={ClientAlias} prettyname={LongName} />
      <SharedFooter />
    </>
  );
};

export default ParentLandingPageLayout;

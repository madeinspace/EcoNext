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
import { IsDisabled, IsSecure } from '../utils/';
import DisabledPageWarning from '../components/DisabledPageWarning';
import { Context } from '../utils/context';
import { Secured, Unsecured } from '../styles/ui';
const IsLite = nodes => some(nodes, 'Disabled');

const SidebarNav = styled.div`
  grid-area: navigation;
`;

const SiteContent = styled.div`
  grid-area: content;
`;

const ParentLandingPageLayout = ({ children = null }) => {
  const { clientData, handle, navigation } = useContext(Context);

  const { Alias: alias, clientID, LongName: prettyname, Name: name } = clientData;
  const logo = require(`../images/logos/${alias}.png`);
  const isDisabled = IsDisabled(navigation, handle);
  const isSecure = IsSecure(navigation, handle);

  return (
    <>
      <SearchApp alias={alias} clientID={clientID} prettyname={prettyname} clientImage={logo} />
      <ClientHeader alias={alias} prettyname={prettyname} clientImage={logo} isLite={IsLite(navigation)} />
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={alias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          Select a topic
          <SiblingsMenu />
          {isSecure ? <Secured /> : <Unsecured />}
          {isDisabled ? <DisabledPageWarning client={clientData} /> : children}
        </SiteContent>
      </ContentRow>
      <SiteMap alias={alias} prettyname={prettyname} />
      <SharedFooter />
    </>
  );
};

export default ParentLandingPageLayout;

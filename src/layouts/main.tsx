import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ClientHeader from '../components/ClientHeader';
import SearchApp from '../components/search/_Search';
import MainNavigation from '../components/MainNavigation';
import { ContentRow } from '../components/grid';
import SiteMap from '../components/SiteMap';
import SharedFooter from '../components/SharedFooter';
import some from 'lodash/some';
import SiblingsMenu from '../components/SiblingsMenu';
import { IsDisabled, IsSecure } from '../utils/';
import DisabledPageWarning from '../components/DisabledPageWarning';
import { SidebarNav, SiteContent } from '../styles/MainContentStyles';
import { Secured, Unsecured } from '../styles/ui';
import { ClientContext, PageContext } from '../utils/context';
const IsLite = nodes => some(nodes, 'Disabled');

const Layout = ({ children }) => {
  const { ClientAlias, clientID, clientPages, LongName } = useContext(ClientContext);
  const { handle } = useContext(PageContext);

  const logo = require(`../images/logos/${ClientAlias}.png`);
  const isDisabled = IsDisabled(clientPages, handle);
  const isSecure = IsSecure(clientPages, handle);

  return (
    <>
      <SearchApp alias={ClientAlias} clientID={clientID} prettyname={LongName} clientImage={logo} />
      <ClientHeader alias={ClientAlias} prettyname={LongName} clientImage={logo} isLite={IsLite(clientPages)} />
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={ClientAlias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

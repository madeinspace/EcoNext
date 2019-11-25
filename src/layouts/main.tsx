import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ClientHeader from '../components/ClientHeader';
import { useRouter } from 'next/router';
import Header from '../components/header';
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
import { Context } from '../utils/context';
const IsLite = nodes => some(nodes, 'Disabled');

const SidebarNav = styled.div`
  grid-area: navigation;
`;

const SiteContent = styled.div`
  grid-area: content;
`;

const Layout = ({ children }) => {
  const { clientData, handle, navigation } = useContext(Context);

  const { Alias: alias, clientID, LongName: prettyname, Name: name } = clientData;
  const logo = require(`../images/logos/${alias}.png`);
  const isDisabled = IsDisabled(navigation, handle);

  return (
    <>
      {useRouter().pathname === '/' ? (
        <Header siteTitle={'Find your economic profile…'} />
      ) : (
        <>
          <SearchApp alias={alias} clientID={clientID} prettyname={prettyname} clientImage={logo} />
          <ClientHeader alias={alias} prettyname={prettyname} clientImage={logo} isLite={IsLite(navigation)} />
        </>
      )}
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={alias} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          <SiblingsMenu />
          {isDisabled ? <DisabledPageWarning client={clientData} /> : children}
        </SiteContent>
      </ContentRow>
      <SiteMap alias={alias} prettyname={prettyname} />
      <SharedFooter />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

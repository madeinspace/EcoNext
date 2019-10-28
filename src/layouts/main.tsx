import React from 'react';
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

const IsLite = nodes => some(nodes, 'Disabled');

const Layout = ({ children, client, navnodes, products, sitemapGroup }) => {
  return (
    <>
      {useRouter().pathname === '/' ? (
        <Header siteTitle={'Find your economic profile…'} />
      ) : (
        <>
          <SearchApp
            alias={client.Alias}
            clientID={client.clientID}
            longName={client.LongName}
            clientImage={'data.clientLogo.imageData.fixed'}
          />
          <ClientHeader
            alias={client.Alias}
            name={client.Name}
            longName={client.LongName}
            products={products}
            clientID={client.clientID}
            clientImage={'data.clientLogo.imageData.fixed'}
            isLite={IsLite(navnodes)}
          />
        </>
      )}
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={client.Alias} navigationNodes={navnodes} />
        </SidebarNav>
        <SiteContent>
          <SiblingsMenu navigationNodes={navnodes} clientAlias={client.Alias} />
          {children}
        </SiteContent>
      </ContentRow>
      <SiteMap
        alias={client.Alias}
        colGroups={sitemapGroup}
        longName={client.LongName}
        products={products}
        navigationNodes={navnodes}
      />
      <SharedFooter />
    </>
  );
};

Layout.propTypes = {
  alias: PropTypes.any,
  navnodes: PropTypes.any,
  children: PropTypes.node.isRequired
};

export default Layout;

const SidebarNav = styled.div`
  grid-area: navigation;
`;

const SiteContent = styled.div`
  grid-area: content;
`;

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

const SidebarNav = styled.div`
  grid-area: navigation;
`;

const SiteContent = styled.div`
  grid-area: content;
`;

const Layout = ({ children, client, navnodes, products, sitemapGroup }) => {
  const { Alias: alias, clientID, LongName: prettyname, Name: name } = client;
  const logo = require(`../images/logos/${alias}.png`);
  return (
    <>
      {useRouter().pathname === '/' ? (
        <Header siteTitle={'Find your economic profile…'} />
      ) : (
        <>
          <SearchApp alias={alias} clientID={clientID} prettyname={prettyname} clientImage={logo} />
          <ClientHeader
            alias={alias}
            name={name}
            prettyname={prettyname}
            products={products}
            clientID={clientID}
            clientImage={logo}
            isLite={IsLite(navnodes)}
          />
        </>
      )}
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={alias} navigationNodes={navnodes} />
        </SidebarNav>
        <SiteContent id={'main-content'}>
          <SiblingsMenu navigationNodes={navnodes} clientAlias={alias} />
          {children}
        </SiteContent>
      </ContentRow>
      <SiteMap
        alias={alias}
        colGroups={sitemapGroup}
        prettyname={prettyname}
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
  children: PropTypes.node.isRequired,
};

export default Layout;

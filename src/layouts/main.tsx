/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import ClientHeader from '../components/ClientHeader';
import { useRouter } from 'next/router';
// import { Location } from "@reach/router"
import Header from '../components/header';
// import SearchApp from './search/_Search';
import MainNavigation from '../components/MainNavigation';
import styled from 'styled-components';
import { ContentRow } from '../components/grid';
import SiteMap from '../components/SiteMap';
import SharedFooter from '../components/SharedFooter';
import some from 'lodash/some';
import SiblingsMenu from '../components/SiblingsMenu';

const IsLite = nodes => some(nodes, 'Disabled');

const Layout = ({ children, alias, navnodes, products }) => {
  return (
    <>
      {useRouter().pathname === '/' ? (
        <Header siteTitle={'Find your economic profile…'} />
      ) : (
        <React.Fragment>
          <ClientHeader
            alias={'MONASH'}
            name={'monash'}
            longName={'monash'}
            products={products}
            clientID={102}
            clientImage={'data.clientLogo.imageData.fixed'}
            isLite={IsLite(navnodes)}
          />
        </React.Fragment>
      )}
      <ContentRow>
        <SidebarNav>
          <MainNavigation alias={alias} navigationNodes={navnodes} />
        </SidebarNav>
        <SiteContent>{children}</SiteContent>
      </ContentRow>
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

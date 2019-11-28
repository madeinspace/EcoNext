import fetchClients from '../api/home';
import Link from 'next/link';
import IDidentity from '../components/ui/IDIdentity';
import styled from 'styled-components';
import { CenteredContainer } from '../components/grid';
import ClientProductsNav from '../components/ClientProductsNav';
import SharedFooter from '../components/SharedFooter';
import { ClientContext } from '../utils/context';

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-auto-rows: 1fr;
  justify-content: center;
  align-content: bottom;
  margin-bottom: 80px;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const IntroWrapper = styled.div`
  background-color: #70b859;
  color: #fff;
  padding: 50px 0;
  margin-bottom: 40px;
  p {
    line-height: 30px;
    font-size: 20px;
    opacity: 0.8;
    color: #fff;
  }
  h1 {
    font-size: 45px;
    margin-bottom: 27px;
  }
`;

const ClientLogo = styled.img`
  max-width: 70%;
`;

const CouncilName = styled.span`
  color: #999;
  font-weight: 700;
  max-width: 80%;
  text-align: center;
`;

const Tile = styled.div`
  &:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  background: white;
  border: 0.5px #e8e8e8 solid;
  transition: box-shadow 0.3s cubic-bezier(0.05, 0.69, 0.14, 1);
  &:hover {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.15);
    z-index: 2;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* stack logo and text */
  margin-left: -1px;
  margin-top: -1px;
`;

const products = [
  {
    AppID: 1,
    FullName: 'Community profile',
    SubDomainName: 'profile',
    Name: 'profile.id',
  },
  {
    AppID: 2,
    FullName: 'Social atlas',
    SubDomainName: 'atlas',
    Name: 'atlas.id',
  },
  {
    AppID: 3,
    FullName: 'Population forecast',
    SubDomainName: 'forecast',
    Name: 'forecast.id',
  },
  {
    AppID: 4,
    FullName: 'Economic profile',
    SubDomainName: 'economy',
    Name: 'economy.id',
  },
  {
    AppID: 1016,
    FullName: 'Housing monitor',
    SubDomainName: 'housing',
    Name: 'housing.id',
  },
];

const HomePage = ({ clients }) => {
  const clientList = clients.map(client => (
    <Tile key={client.ClientID}>
      <Link href={`/${client.ClientAlias}`} prefetch={false}>
        <ClientLogo src={require(`../images/logos/${client.ClientAlias}.png`)} />
      </Link>
      <CouncilName>{client.Name}</CouncilName>
    </Tile>
  ));

  return (
    <ClientContext.Provider value={{ clientProducts: products }}>
      <CenteredContainer>
        <IDidentity />
      </CenteredContainer>
      <CenteredContainer>
        <ClientProductsNav alias={''} />
      </CenteredContainer>
      <IntroWrapper>
        <CenteredContainer>
          <h1>Find your economic profile…</h1>
          <p>
            .id delivers online economic profiles to councils across Australia. These are delivered in public websites,
            branded economy.id, for anyone to access. The sites bring together economic data from multiple sources to
            tell the story of a local economy and how it is changing. This information is designed to be used by council
            staff, local businesses, investors, community groups, students and the general public.
          </p>{' '}
          <p>
            You can be confident about the quality of the information in the economic profiles as it is derived from
            official sources, includes the most robust economic modeling and is analysed and presented by experts. Each
            data source is maintained with the latest series so you can be sure you are using the most up to date
            information.
          </p>{' '}
          <p>
            Click on the links below to access local economic data in its most compelling form including Gross Regional
            Product, local jobs, local businesses, employment, unemployment, population, building approvals, industry
            structure, journey to work and much more.
          </p>
        </CenteredContainer>
      </IntroWrapper>
      <CenteredContainer>
        <LogoGrid>{clientList}</LogoGrid>
      </CenteredContainer>
      <SharedFooter />
    </ClientContext.Provider>
  );
};

HomePage.getInitialProps = async () => {
  const clients = await fetchClients();

  return { clients };
};

export default HomePage;

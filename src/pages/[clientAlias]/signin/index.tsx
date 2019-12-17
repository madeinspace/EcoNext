import * as _ from './node_modules/lodash';
import Head from './node_modules/next/head';
import fetchClientData from '../../../utils/fetchClientData';
import { PageMappings } from '../../../layouts';
import MainLayout from '../../../layouts/main';
import { PageContext, ClientContext } from '../../../utils/context';
import PageHeader from '../../../components/PageHeader';
import LoginForm from '../../../components/LoginForm';
import { useContext } from './node_modules/react';
import { Actions, Share } from '../../../components/Actions';
import ErrorPage from '../../../layouts/error';
import SignInPage from '../../../layouts/signin';

const SignInPageTemplate = () => {
  const { pageData } = useContext(PageContext) || {};
  const { clientAlias } = useContext(ClientContext) || {};

  if (!pageData || !clientAlias) {
    return <MainLayout Template={() => <ErrorPage status={404} />}>404</MainLayout>;
  }

  return (
    <SignInPage>
      <PageHeader>
        <Actions>
          <Share />
        </Actions>
      </PageHeader>
      <div>
        <p>
          Due to the specialised nature of the information in the Impact assessment module, this area of the site is
          password protected, and only available to council staff.
        </p>
        <p>
          If you work within council and do not know your password or would like to enquire about getting access to the
          Impact assessment model, please contact your council`s economy.id administrator.
        </p>
        <p>
          Alternatively you can contact{' '}
          <a href="https://home.id.com.au/contact" title="contact .id">
            .id, the population experts.
          </a>
        </p>
      </div>
      <LoginForm />
    </SignInPage>
  );
};

const LoginPage = ({ client, page }) => {
  return (
    <>
      <PageContext.Provider value={page}>
        <ClientContext.Provider value={client}>
          <SignInPageTemplate />
        </ClientContext.Provider>
      </PageContext.Provider>
    </>
  );
};

LoginPage.getInitialProps = async function({ query, req: { containers } }) {
  const { clientAlias: clientAlias } = query;

  const client = await fetchClientData({ clientAlias, containers });

  const { AllPages } = containers;

  const pageData = AllPages;

  const page = {
    handle: 'login',
    tableData: [],
    filters: [],
    filterToggles: [],
    pageData,
    entities: [],
  };

  return {
    client,
    page,
  };
};

export default LoginPage;

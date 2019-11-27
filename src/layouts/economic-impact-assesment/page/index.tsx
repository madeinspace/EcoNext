// #region imports
import _ from 'lodash';
import Layout from '../../main';
import { MainTitle, SubTitle } from '../../../styles/MainContentStyles';
import PageHeader from '../../../components/PageHeader';
import { Context } from '../../../utils/context';
// #endregion

// #region population page
const EconomicImpactAssesment = () => (
  <Context.Consumer>
    {({ clientData, clientAlias, tableData, clientProducts }) => {
      const { LongName: prettyName } = clientData;
      const handleExport = async () => {
        const IDReportRequest = {
          FileName: `Population - ${prettyName}`,
          Urls: [
            {
              Title: `Population - ${prettyName}`,
              url: window.location.href,
            },
          ],
          Action: 0,
          EmailAddress: 'fabrice@id.com.au',
        };

        try {
          const data = await postData(
            'https://idreportserviceweb.azurewebsites.net/api/IDReportService/RequestReport/',
            IDReportRequest,
          ).then(res => {
            console.log('Report Ok: ', res);
          });
          console.log(`Page report request: Population - ${prettyName}`);
        } catch (error) {
          console.error(error);
        }
      };

      const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.json();
      };

      return (
        <Layout>
          <PageHeader handleExport={handleExport}>
            <MainTitle>{prettyName}</MainTitle>
            <SubTitle>Population page</SubTitle>
          </PageHeader>
        </Layout>
      );
    }}
  </Context.Consumer>
);

// #endregion

export default EconomicImpactAssesment;

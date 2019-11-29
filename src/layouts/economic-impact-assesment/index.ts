import { sqlConnection } from '../../utils/sql';

import Page from './page';

const fetchData = async filters => {
  const data = { title: 'economic impact assessment' };

  return data;
};

const pageContent = {
  entities: [],
  toggle: [
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Current area:',
      Params: [
        {
          ClientID: '2',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_Area_IAM',
      ParamName: 'WebID',
    },
    {
      Database: 'CommApp',
      DefaultValue: '23600',
      Label: 'Select industry',
      Params: [
        {
          a: '1',
        },
      ],
      StoredProcedure: 'sp_Toggle_Econ_IndustryNieir96',
      ParamName: 'IndkeyNieir49',
    },
    {
      Database: 'CommApp',
      DefaultValue: '1',
      Label: 'Impact measure:',
      Params: null,
      StoredProcedure: 'sp_Toggle_Econ_ImpactType',
      ParamName: 'ImpactType',
    },
    {
      Database: 'CommApp',
      DefaultValue: '10',
      Label: 'Value:',
      Params: null,
      StoredProcedure: '',
      ParamName: 'Quantity',
    },
    {
      Database: 'CommApp',
      DefaultValue: '',
      Label: 'Scenario/Organisation (optional):',
      Params: null,
      StoredProcedure: '',
      ParamName: 'Company',
    },
  ],
};

export { fetchData, Page, pageContent };

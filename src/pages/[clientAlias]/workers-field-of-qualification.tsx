import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import qs from 'qs';
import { formatNumber, formatChangeNumber } from '../../Utils';
import EntityTable from '../../components/table/EntityTable';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import React from 'react';
import Layout from '../../layouts/main';

const LocalWorkerFieldsOfQualififcation = ({
  clients,
  tableData,
  IGBM,
  Industries,
  Sexes,
  filters,
  navigation,
  clientProducts
}) => {
  const router = useRouter();
  const { clientAlias } = router.query;

  const tableParams = tableBuilder({
    prettyName: 'prettyName',
    indName: 'indName',
    bmName: 'bmName',
    genderName: 'female',
    TabularData: tableData
  });

  const currentIndustry = filters.Indkey;
  const currentBenchmark = filters.IGBMID;
  const gender = filters.Sex;

  const setQuery = (key, value) => {
    const query = { ...qs.parse(location.search, { ignoreQueryPrefix: true }) };
    query[key] = value;
    Router.push({
      pathname: `/${clientAlias}/workers-field-of-qualification`,
      query: { ...query }
    });
  };

  const handleControlPanelReset = () => {};

  return (
    <Layout alias={clientAlias} navnodes={navigation} products={clientProducts}>
      <h1>Workers field of qualification</h1>
      <p>Client alias is {clientAlias}</p>
      <ControlPanel
        onReset={handleControlPanelReset}
        dropdowns={[
          {
            title: 'Current industry:',
            value: currentIndustry,
            handleChange: e => {
              setQuery('Indkey', e.target.value);
            },
            items: Industries
          },
          {
            title: 'Current benchmark:',
            value: currentBenchmark,
            handleChange: e => setQuery('IGBMID', e.target.value),
            items: IGBM
          },
          {
            title: 'Gender:',
            value: gender,
            handleChange: e => setQuery('Sex', e.target.value),
            items: Sexes
          }
        ]}
      />

      <EntityTable
        data={tableParams}
        name={'Local workers - field of qualification'}
      />
    </Layout>
  );
};

export default LocalWorkerFieldsOfQualififcation;

LocalWorkerFieldsOfQualififcation.getInitialProps = async ({ query }) => {
  const defaultFilters = {
    Indkey: 23000,
    IGBMID: 40,
    Sex: 3
  };
  const filters = { ...defaultFilters, ...query };
  const { clientAlias } = query;

  const res = await fetch(
    `http://localhost:3000/api/${clientAlias}/workers-field-of-qualification?${qs.stringify(
      filters
    )}`
  );
  const data = await res.json();
  data.filters = filters;
  return data;
};

const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth,
    Australia (3218.0). Compiled and presented in economy.id by{' '}
    <a
      href="http://home.id.com.au/about-us/"
      target="_blank"
      title=".id website"
    >
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);

const tableBuilder = ({
  prettyName: clientName,
  indName: industry,
  bmName: benchmark,
  genderName: gender,
  TabularData: data
}) => {
  const footerRows = data.filter(item => item.IndustryName === 'Total');
  const parents = _.sortBy(
    data.filter(
      item => item.Hierarchy === 'P' && item.IndustryName !== 'Total'
    ),
    item => item.LabelKey
  );
  const children = data.filter(item => item.Hierarchy === 'C');

  parents.forEach(parent => {
    parent.children = children.filter(
      child =>
        child.LabelKey > parent.LabelKey &&
        child.LabelKey < parent.LabelKey + 1000
    );
  });

  return {
    cssClass: '',
    allowExport: false,
    allowSort: true,
    allowSortReset: true,
    groupOn: '',
    clientAlias: 'Monash',
    source: <Source />,
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by.id, the population experts.',
    anchorName: 'service-age-groups',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: 'Local workers field of qualification - Summary',
            colSpan: 10,
            rowSpan: 0
          }
        ],
        key: 'hr0'
      },
      {
        cssClass: '',
        cols: [
          {
            cssClass: '',
            displayText: `${clientName} - ${industry}`,
            colSpan: 1,
            rowSpan: 0
          },
          {
            cssClass: 'xeven start-year',
            displayText: ' 2016',
            colSpan: 3,
            rowSpan: 0
          },
          {
            cssClass: 'xodd end-year',
            displayText: '2011',
            colSpan: 3,
            rowSpan: 0
          },
          {
            cssClass: 'xeven start-year',
            displayText: 'Change',
            colSpan: 1,
            rowSpan: 0
          }
        ],
        key: 'hr1'
      }
    ],
    cols: [
      {
        id: 0,
        displayText:
          'Field of qualification (Click rows to view sub-categories)',
        dataType: 'int',
        sortable: false,
        cssClass: 'xodd xfirst'
      },
      {
        id: 1,
        displayText: 'Number',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:#,0}'
      },
      {
        id: 2,
        displayText: '%',
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}'
      },
      {
        id: 3,
        displayText: `${benchmark}`,
        dataType: 'money',
        sortable: true,
        cssClass: 'xeven latest',
        format: '{0:+#,0;-#,0;0}'
      },
      {
        id: 4,
        displayText: 'Number',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:#,0}'
      },
      {
        id: 5,
        displayText: '%',
        dataType: 'money',
        sortable: true,
        cssClass: 'per xodd',
        format: '{0:+#,0;-#,0;0}'
      },
      {
        id: 6,
        displayText: `${benchmark}`,
        dataType: 'money',
        sortable: true,
        cssClass: 'xodd',
        format: '{0:+#,0;-#,0;0}'
      },
      {
        id: 7,
        displayText: '2011 - 2016',
        title: '',
        dataType: 'int',
        sortable: true,
        cssClass: 'xeven',
        format: '{0:#,0}'
      }
    ],
    rows: parents.map(row => ({
      expandable: row.children.length > 0,
      id: row.LabelKey,
      data: [
        row.LabelName,
        row.NoYear1,
        row.PerYear1,
        row.BMYear1,
        row.NoYear2,
        row.PerYear2,
        row.BMYear2,
        row.Change12
      ],
      formattedData: [
        `${row.LabelName}`,
        formatNumber(row.NoYear1),
        formatNumber(row.PerYear1),
        formatNumber(row.BMYear1),
        formatNumber(row.NoYear2),
        formatNumber(row.PerYear2),
        formatNumber(row.BMYear2),
        formatChangeNumber(row.Change12, '--')
      ],
      childRows: row.children.map(childRow => ({
        id: childRow.LabelKey,
        data: [
          childRow.LabelName,
          childRow.NoYear1,
          childRow.PerYear1,
          childRow.BMYear1,
          childRow.NoYear2,
          childRow.PerYear2,
          childRow.BMYear2,
          childRow.Change12
        ],
        formattedData: [
          `${childRow.LabelName}`,
          formatNumber(childRow.NoYear1),
          formatNumber(childRow.PerYear1),
          formatNumber(childRow.BMYear1),
          formatNumber(childRow.NoYear2),
          formatNumber(childRow.PerYear2),
          formatNumber(childRow.BMYear2),
          formatChangeNumber(childRow.Change12, '--')
        ]
      }))
    })),
    footRows: footerRows.map(row => {
      return {
        cssClass: '',
        cols: [
          { cssClass: '', displayText: `Total ${gender}`, colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.PerYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.BMYear1), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.NoYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.PerYear2), colSpan: 1 },
          { cssClass: '', displayText: formatNumber(row.BMYear2), colSpan: 1 },
          {
            cssClass: '',
            displayText: formatChangeNumber(row.Change12),
            colSpan: 1
          }
        ]
      };
    }),
    noOfRowsOnInit: 16
  };
};

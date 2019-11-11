import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import qs from 'qs';
import {
  formatNumber,
  formatChangeNumber,
  formatShortDecimal,
} from '../../../Utils';
import EntityTable from '../../../components/table/EntityTable';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import React from 'react';
import Layout from '../../../layouts/main';
import EntityChart from '../../../components/chart/EntityChart';
import IsoChart from '../../../components/isoChart/chart';

import fetchData from './api'

const LocalWorkerFieldsOfQualififcation = ({
  client,
  tableData,
  IGBM,
  Industries,
  Sexes,
  filters,
  navigation,
  clientProducts,
  sitemapGroups
}) => {
  const router = useRouter();
  const { clientAlias } = router.query;
  const currentIndustryID = filters.Indkey;
  const currentBenchmarkID = filters.IGBMID;
  const currentGenderID = filters.Sex;

  const getNameByID = (id, arr) => {
    const result = arr.find(i => i.ID.toString() === id.toString());
    return (result || {})['Name'];
  };

  const currentIndustyName = getNameByID(currentIndustryID, Industries);
  const currentBenchmarkName = getNameByID(currentBenchmarkID, IGBM);
  const currentGenderName = getNameByID(currentGenderID, Sexes);

  const tableParams = tableBuilder({
    prettyName: client.ShortName,
    indName: currentIndustyName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: tableData
  });

  const chartData = chartBuilder({
    prettyName: client.ShortName,
    indName: currentIndustyName,
    bmName: currentBenchmarkName,
    genderName: currentGenderName,
    TabularData: tableData
  });

  const setQuery = (key, value) => {
    const query = { ...qs.parse(location.search, { ignoreQueryPrefix: true }) };
    query[key] = value;
    Router.push({
      pathname: `/${clientAlias}/workers-field-of-qualification`,
      query: { ...query }
    });
  };
  const handleControlPanelChange = () => {};
  const handleControlPanelReset = () => {};

  return (
    <Layout
      client={client}
      navnodes={navigation}
      products={clientProducts}
      sitemapGroup={sitemapGroups}
    >
      <h1>Workers field of qualification</h1>
      <h3>Local workers - Field of qualification - {currentIndustyName}</h3>
      <ControlPanel
        onReset={handleControlPanelReset}
        dropdowns={[
          {
            title: 'Current industry:',
            value: currentIndustryID,
            handleChange: e => setQuery('Indkey', e.target.value),
            items: Industries
          },
          {
            title: 'Current benchmark:',
            value: currentBenchmarkID,
            handleChange: e => setQuery('IGBMID', e.target.value),
            items: IGBM
          },
          {
            title: 'Gender:',
            value: currentGenderID,
            handleChange: e => setQuery('Sex', e.target.value),
            items: Sexes
          }
        ]}
      />
      <EntityTable
        data={tableParams}
        name={'Local workers - field of qualification'}
      />
      <EntityChart data={chartData} />
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

  const data = await fetchData(filters);

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

// #region table builders
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
// #endregion

// #region chart builders
const chartBuilder = ({
  prettyName: clientName,
  indName: currentIndustry,
  bmName: currentBenchmark,
  genderName: gender,
  TabularData: data
}) => {
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
  const perYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.PerYear1,
      drilldown: `${item.LabelName}-peryear`
    };
  });
  const BMYear1Serie = _.map(parents, item => {
    return {
      name: item.LabelName,
      y: item.BMYear1,
      drilldown: `${item.LabelName}-change`
    };
  });
  const drilldownPerYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentIndustry}`,
      id: `${parent.LabelName}-peryear`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.PerYear1];
      })
    };
  });
  const drilldownChangeYear1Serie = _.map(parents, parent => {
    return {
      name: `${currentBenchmark}`,
      id: `${parent.LabelName}-change`,
      data: _.map(parent.children, child => {
        return [`${child.LabelName}`, child.BMYear1];
      })
    };
  });
  drilldownPerYear1Serie.push(...drilldownChangeYear1Serie);
  return {
    highchartOptions: {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Local workers field of qualification, 2016',
        align: 'left'
      },
      subtitle: {
        text: `${clientName} - ${currentIndustry} - ${gender}`,
        align: 'left'
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${
            this.colorIndex
          }">\u25CF</span> ${this.series.name}: ${formatShortDecimal(this.y)}%`;
        }
      },
      series: [
        {
          name: `${clientName}`,
          data: perYear1Serie
        },
        {
          name: `${currentBenchmark}`,
          data: BMYear1Serie
        }
      ],
      drilldown: {
        allowPointDrilldown: false,
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic'
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic'
        },
        series: drilldownPerYear1Serie
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Field of qualification',
          align: 'low'
        }
      },
      yAxis: [
        {
          title: {
            text: `Percentage of ${gender} workers`
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${this.value}%`;
            }
          }
        }
      ]
    },
    rawDataSource:
      'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.',
    dataSource: <Source />,
    chartContainerID: 'chart1',
    logoUrl: 'http://profile.local.com.au:8666/dist/images/id-logo.png',
    entityID: 1,
    chartTemplate: 'Standard'
  };
};
// #endregion

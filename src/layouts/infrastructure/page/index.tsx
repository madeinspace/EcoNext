// #region imports
import { useContext, useState } from 'react';
import { PageContext } from '../../../utils/context';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper, SubTitleAlt, ItemWrapper, TopList } from '../../../styles/MainContentStyles';
import _ from 'lodash';
import EntityChart from '../../../components/chart/EntityChart';
import { idlogo, formatPercent } from '../../../utils';
import { IdLink } from '../../../components/ui/links';
import ReactHtmlParser, { processNodes } from 'react-html-parser';

const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
// #endregion
const Infra = styled.div`
  display: flex;
  flex-wrap: wrap;

  ul {
    flex-direction: column;
    flex: 1 1;
  }
`;

// #region template page
const InfrastructurePage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const {
    contentData: { mapData, textData },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);
  const data = { ...textData[0] };
  delete data['ClientID'];
  delete data['WebID'];
  delete data['LabelKey'];
  delete data['LabelName'];
  delete data['GeoName'];

  const textArray = Object.keys(data).map(key => {
    const displayText = data[key] === null ? '' : data[key].replace(/<(?!\/?(h3|ul|li)(?=>|\s.*>))\/?.*?>/g, '');
    const dataObj = {
      key,
      title: key
        .replace(/([a-z])([A-Z])/g, `$1 $2`)
        .replace(' Text Initial', '')
        .replace(' Text Long', ''),
      displayText,
    };
    return dataObj;
  });

  const infra = textArray
    .filter(({ title }) => title === 'Infrastructure')
    .reduce((acc, curr) => {
      return {
        ...acc,
        key: 'Infrastructure',
        title: 'Infrastructure',
        displayText: `<p>${acc.displayText}<p><p>${curr.displayText}</p>`,
      };
    });
  const rest = textArray.filter(({ title }) => title != 'Infrastructure');
  const isRda = textArray.every(({ displayText }) => displayText === '');

  return (
    <>
      {ReactHtmlParser(infra.displayText)}
      <MapWrapper>
        <MapLoader loaded={mapLoaded} />
        <LeafletMap mapData={mapData} onMapLoaded={onMapLoaded} />
      </MapWrapper>
      <ItemWrapper>
        <EntityChart data={chartBuilder()} />
      </ItemWrapper>
      <p>
        NOTE: The land use shown in the map is derived from ABS Mesh Block categories. Mesh Blocks broadly identify land
        use and are not designed to provide definitive land use. It is purely an indicator of the main planned land use
        for a Mesh Blocks. For more information please refer to ABS Mesh Block categories.
      </p>
      {isRda ? (
        <></>
      ) : (
        <>
          {rest.map(({ title, displayText, key }) => {
            return (
              displayText != '' && (
                <>
                  <SubTitleAlt>{title}</SubTitleAlt>
                  <Infra key={key}>
                    {ReactHtmlParser(displayText, {
                      transform: function(node, index) {
                        if (node.type === 'tag' && node.name === 'h3') {
                          return null;
                        }
                        if (node.type === 'tag' && node.name === 'ul') {
                          return <TopList>{processNodes(node.children)}</TopList>;
                        }
                      },
                    })}
                  </Infra>
                </>
              )
            );
          })}
        </>
      )}
    </>
  );
};
export default InfrastructurePage;
// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Bureau of Statistics, 2011 and 2016. Compiled and presented by <IdLink />
  </p>
);

// #endregion

// #region chart builders
const chartBuilder = () => {
  const {
    contentData: { landUse },
  } = useContext(PageContext);

  const perYear1Serie = landUse.map(({ PerYear1, LabelName }) => {
    return { name: LabelName, y: PerYear1 };
  });

  const chartType = 'pie';
  const chartTitle = `Land use`;
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Census of Population and Housing, 2016 Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'chart1';
  const chartTemplate = 'Standard';

  return {
    rawDataSource,
    dataSource: <TableSource />,
    chartContainerID,
    logoUrl: idlogo,
    chartTemplate,
    highchartOptions: {
      chart: {
        type: chartType,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: chartTitle,
      },

      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${this.colorIndex}">\u25CF</span> ${this.series.name}: ${formatPercent(
            this.y,
          )}%`;
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: `Land use`,
          data: perYear1Serie,
          colorByPoint: true,
        },
      ],
      xAxis: {
        type: 'category',
        title: {
          text: '',
        },
      },
      legend: { enabled: false },
      yAxis: [
        {
          title: {
            text: '',
          },
          labels: {
            staggerLines: 0,
            formatter: function() {
              return `${this.value}%`;
            },
          },
        },
      ],
    },
  };
};
// #endregion

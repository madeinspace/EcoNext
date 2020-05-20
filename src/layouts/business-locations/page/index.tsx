// #region imports
import dynamic from 'next/dynamic';
import { useContext, useState, useRef } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { MapLoader } from '../../../components/Map/MapLoader';
import {
  MapWrapper,
  PageIntro,
  SourceBubble,
  ItemWrapper,
  SubTitleAlt,
  EntityTitle,
} from '../../../styles/MainContentStyles';
import { PageContext, ClientContext } from '../../../utils/context';
import { IdLink } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import { formatPercent, formatNumber } from '../../../utils';
import EntityTable from '../../../components/table/EntityTable';
import RelatedPagesCTA from '../../../components/RelatedPages';
const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
import axios from 'axios';
import parse from 'html-react-parser';
import React from 'react';
import { ExportButton, ResetButton } from '../../../components/Actions';
import { EntityFooter } from '../../../components/EntityFooter';
// #endregion

// #region template page
const BusinessLocationsPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [Table, setTable] = useState(null);
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    filters,
    contentData: { mapData },
    entityData: { currentIndustryName },
  } = useContext(PageContext);

  const onMapLoaded = () => setMapLoaded(true);

  let selectedAreas = [];
  const handleShapeSelection = id => {
    selectedAreas.indexOf(id) === -1 ? selectedAreas.push(id) : selectedAreas.splice(selectedAreas.indexOf(id), 1);
    selectedAreas.length > 0 ? getTable() : setTable(null);
  };
  const mapRef: any = useRef();

  const reset = () => {
    setTable(null);
    selectedAreas = [];
    mapRef.current.resetLayerStyles();
  };

  const getTable = () => {
    axios
      .get(
        `https://economy.id.com.au/${clientAlias}/entity/table/2902?IndkeyABR=${
          filters.IndkeyABR
        }&Title=${currentIndustryName}&ShapeId=${selectedAreas.toString()}`,
      )
      .then(res => {
        const table = res.data.replace('[ShapeId]', `${currentIndustryName}`);
        const parsedTable = parse(table, {
          replace: domNode => {
            if (domNode.attribs && domNode.attribs.class === 'btn-group') {
              const url = domNode.children.filter(item => {
                if (item.attribs) {
                  return item.attribs.class === 'idc-controlpanel-button-export';
                }
              })[0].attribs.href;
              return (
                <>
                  <ResetButton onClick={reset} />
                  <ExportButton name="Export to excel" onClick={() => window.open(`${url}`, '_self')} />
                </>
              );
            }
          },
        });

        setTable(parsedTable);
      });
  };

  const MapSource = () => (
    <p>
      Source: Australian Business Register. Compiled and presented in economy.id by <IdLink />. <strong>Note</strong>:
      The data presented in this map and table are subjected to a confidentiality process. This is done to avoid the
      identification of particular businesses.
    </p>
  );

  return (
    <>
      <PageIntro>
        <div>
          <p>
            The Australian Business Register is a register of all business entities and sole traders in Australia, based
            on Australian Business Numbers (ABNs), maintained by the Australian Taxation Office.
          </p>
          <p>
            Data from the ABR is useful in planning and economic development, to identify the spatial patterns of
            businesses across the Monash, clusters and change in business growth patterns across the area.
          </p>
          <p>
            The raw business register dataset contains large numbers of ABNs which are not relevant to local government
            planning, including trusts, superannuation funds, non-active businesses and micro businesses not registered
            for GST. These have been filtered out of the data presented here, to provide a more meaningful dataset for
            Local Government Decision making.
          </p>
          <p>
            Data are presented as aggregates of ABNs at the Destination Zone level, for the most recent time period. The
            distribution of industries shown here can be selected at the 1 or 2-digit ANZSIC classification level, and
            the table below the map shows a further breakdown into more detailed business categories. For more
            information, including actual business locations and name and address details, LGAs are entitled to access
            the raw ABR unit record dataset directly from the ATO.
          </p>
        </div>
        <SourceBubble>
          <div>
            <h3>Data source</h3>
            <p>{useEntityText('DataSource')}</p>
          </div>
        </SourceBubble>
      </PageIntro>
      <ControlPanel />

      <MapWrapper>
        {mapLoaded && (
          <EntityTitle>
            {currentIndustryName}
            <span>{LongName} - Number of businesses by destination zone</span>
          </EntityTitle>
        )}
        {Table && Table}
        <MapLoader loaded={mapLoaded} />
        <LeafletMap
          forwardRef={mapRef}
          mapData={mapData}
          onShapeSelect={handleShapeSelection}
          onMapLoaded={onMapLoaded}
        />
        {mapLoaded && <EntityFooter Source={MapSource} />}
      </MapWrapper>
      <ItemWrapper>
        <EntityTable
          data={tableBuilder()}
          name={`Employment location of resident workers by industry - ${currentIndustryName}`}
        />
      </ItemWrapper>
      <RelatedPagesCTA />
    </>
  );
};
export default BusinessLocationsPage;
// #endregion

// #region sources
const TableSource = () => (
  <p>
    Source: Australian Business Register. Compiled and presented in economy.id by <IdLink />.
  </p>
);
// #endregion

// #region table builders
const tableBuilder = () => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    contentData: { tableData },
    entityData: { currentIndustryName },
  } = useContext(PageContext);
  const rawDataSource =
    'Source: Australian Business Register. Compiled and presented in economy.id by .id , the population experts.';
  const tableTitle = `Australian business register by industry sector`;

  const serie = tableData
    .filter(({ LabelKey }) => LabelKey != 99999)
    .map(({ LabelKey, LabelName, Number, Per, IndustryCode }) => {
      return {
        id: LabelKey,
        data: [LabelName, Number, Per],
        formattedData: [
          `${LabelKey === 1 || LabelKey === 2 ? '-  ' : ''}${LabelName}`,
          IndustryCode,
          formatNumber(Number),
          formatPercent(Per),
        ],
      };
    });
  const footerRows = tableData.filter(({ LabelKey }) => LabelKey === 99999);
  const footerRowSerie = footerRows.map(row => {
    return {
      cssClass: 'total',
      cols: [
        { cssClass: '', displayText: `${row.LabelName}`, colSpan: 1 },
        { cssClass: '', displayText: `${row.IndustryCode}`, colSpan: 1 },
        { cssClass: '', displayText: `${row.Number}`, colSpan: 1 },
        { cssClass: '', displayText: `${row.Per}`, colSpan: 1 },
      ],
    };
  });

  return {
    cssClass: '',
    clientAlias,
    source: <TableSource />,
    rawDataSource,
    anchorName: '#business-locations',
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 10,
          },
        ],
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: 'sub first',
            displayText: `${LongName} - ${currentIndustryName}`,
            colSpan: 2,
          },
          {
            cssClass: 'even',
            displayText: `${LongName}`,
            colSpan: 2,
          },
        ],
      },
    ],
    cols: [
      {
        id: 0,
        displayText: 'Industry',
        cssClass: 'odd first',
      },
      {
        id: 1,
        displayText: 'ANZSIC code',
        cssClass: 'odd int XXXL',
      },
      {
        id: 2,
        displayText: 'Number',
        cssClass: 'even int XL',
      },
      {
        id: 3,
        displayText: '%',
        cssClass: 'even int XL',
      },
    ],
    rows: serie,
    footRows: footerRowSerie,
    noOfRowsOnInit: 0,
  };
};
// #endregion

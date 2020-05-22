// #region imports
import dynamic from 'next/dynamic';
import { useContext, useState, useRef } from 'react';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import { MapLoader } from '../../../components/Map/MapLoader';
import { MapWrapper, PageIntro, SourceBubble, EntityTitle } from '../../../styles/MainContentStyles';
import { PageContext, ClientContext } from '../../../utils/context';
import { IdLink, LinkBuilder } from '../../../components/ui/links';
import useEntityText from '../../../utils/useEntityText';
import RelatedPagesCTA from '../../../components/RelatedPages';
const LeafletMap = dynamic(() => import('../../../components/Map'), { ssr: false });
import axios from 'axios';
import parse from 'html-react-parser';
import React from 'react';
import { ExportButton, ResetButton } from '../../../components/Actions';
import { EntityFooter } from '../../../components/EntityFooter';
import InfoBox from '../../../components/ui/infoBox';
// #endregion

// #region template page
const EmploymentLocationsPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [Table, setTable] = useState(null);
  const { clientAlias, LongName } = useContext(ClientContext);
  const {
    filters: { EconSpace },
    contentData: { mapData },
    entityData: { currentIndustryName, currentMeasureName, prefixedAreaName },
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
    const tableId = +EconSpace === 0 ? '410' : '2889';
    axios
      .get(
        `https://economy.id.com.au/${clientAlias}/entity/table/${tableId}?&Title=${currentIndustryName}&ShapeId=${selectedAreas.toString()}`,
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
      Source: Australian Bureau of Statistics, Census of Population and Housing 2016. Compiled and presented in
      economy.id by <IdLink />.
    </p>
  );

  return (
    <>
      <PageIntro>
        <div>
          <p>
            Place of Work data, mapped to Destination Zones, provide an excellent spatial representation of where each
            industry's economic activity is conducted within {prefixedAreaName}.
          </p>
          <p>
            Some industries are clustered in business parks, or along major transport routes. Others are associated with
            institutions such as schools, universities and hospitals.
          </p>
          <p>
            Employment locations data should be viewed in conjunction with{' '}
            {LinkBuilder(
              `https://profile.id.com.au/${clientAlias}/workers-place-of-residence-industry`,
              `Workers place of residence`,
            )}{' '}
            data to see how far people travel to get to employment in the {prefixedAreaName}, and with{' '}
            {LinkBuilder(
              `https://profile.id.com.au/${clientAlias}/employment-by-industry`,
              `Employment by industry (Total)`,
            )}{' '}
            and{' '}
            {LinkBuilder(
              `https://profile.id.com.au/${clientAlias}/number-of-businesses-by-industry`,
              `Businesses by industry`,
            )}{' '}
            data to see the total size of industries in the area.
          </p>
          <p>
            Data presented here show the number of local workers per destination zone at the 2016 Census. This has been
            derived from the ABS imputed dataset using methodology from the Bureau of Transport statistics, and adjusts
            for Census undercount.
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
      <InfoBox>
        <span>
          <b>Did you know? </b> By clicking/tapping on a destination zone you are able to view data on all industries
          for selected area. Click/tap multiple areas to view aggregated data.
        </span>
      </InfoBox>

      <MapWrapper>
        {mapLoaded && (
          <EntityTitle>
            {currentIndustryName}
            <span>
              {LongName} - Employment locations -{' '}
              {`${+EconSpace === 0 ? 'Number of local workers' : 'Estimated value added'}`}
            </span>
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

      <RelatedPagesCTA />
    </>
  );
};
export default EmploymentLocationsPage;
// #endregion

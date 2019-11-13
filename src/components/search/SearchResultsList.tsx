import * as React from 'react';
import SearchResultPlace from './SearchResultPlace';
import SearchResultTopic from './SearchResultTopic';
import NoSearchResultItem from './NoSearchResultItem';

export interface ISearchResultsListProps {
  results: any;
  noResults: any;
  searchOption: string;
  hasRegistered: boolean;
  clientName: any;
  clientLogo: any;
}

export function SearchResultsList(props: ISearchResultsListProps) {
  let ResultsList: any;
  const {
    results,
    noResults,
    searchOption,
    hasRegistered,
    clientName,
    clientLogo
  } = props;

  const handleResultClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const redirect = encodeURIComponent(window.location.href);
    window.open(
      `https://content.id.com.au/community-access?redirect=${redirect}`,
      '_self'
    );
  };

  // PLace

  if (searchOption === 'place' && !noResults) {
    const placesInArea = results
      .filter(item => item.inArea)
      .map((item, i) => {
        return (
          <SearchResultPlace
            key={'inarea' + i.toString()}
            itemData={item}
            inArea={item.inArea}
          />
        );
      });

    const placesOutsideArea = results
      .filter(item => !item.inArea)
      .map((searchitem, j) => {
        const item: any = (
          <SearchResultPlace
            key={j}
            itemData={searchitem}
            hasRegistered={hasRegistered}
          />
        );
        return !hasRegistered ? (
          <div key={j} className={'locked'} onClick={handleResultClick}>
            <span className={'icon-locked ' + 'lockIcon'} /> {item}
          </div>
        ) : (
          item
        );
      });

    ResultsList = (
      <div>
        <div className={'placesInArea'}>
          <h3 className={'placeInsideTitle'}>PLACES INSIDE {clientName}</h3>
          {/* <Img fixed={clientLogo} className={styles.logoClient} /> */}
        </div>
        {placesInArea.length > 0 ? (
          <div className={'placeInsideList'}>{placesInArea}</div>
        ) : (
          <div className={'placeInsideList'}>
            No places matching your search were found in {clientName}
          </div>
        )}
        {placesOutsideArea.length > 0 ? (
          <div>
            <h3 className={'placeOutsideTitle'}>
              PLACES OUTSIDE {clientName}{' '}
              {!hasRegistered ? (
                <span onClick={handleResultClick}>
                  (CLICK RESULTS TO UNLOCK ALL PLACES)
                </span>
              ) : null}
            </h3>
            <div className={'placeOusideList'}>{placesOutsideArea}</div>
          </div>
        ) : null}
      </div>
    );
  }
  //
  else if (searchOption === 'topic' && !noResults) {
    const topicList = results.map((item, i) => {
      return <SearchResultTopic key={'item' + i} itemData={item} />;
    });
    ResultsList = (
      <div>
        <h3 className={'topicTitle'}>TOPICS WITHIN {clientName}</h3>
        {topicList}
      </div>
    );
  } else {
    ResultsList = <NoSearchResultItem key={1} clientLongName={clientName} />;
  }
  return <div className={`${'scroller'} resultScroller`}>{ResultsList}</div>;
}

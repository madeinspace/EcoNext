import * as React from 'react';
import { KnowledgeBaseCTA } from './ResultsCTAs/ResultsKnoledgebaseTeaser';
import { SearchResultsFilters } from './SearchResultsFilters';
import { SearchResultsList } from './SearchResultsList';
import styled from 'styled-components';
import { HeaderRow } from '../grid';

export interface ISearchresultsProps {
  noResults: boolean;
  results: any[];
  tabs: any;
  currentTab: number;
  filter: any;
  countTotal: number;
  searchOption: string;
  hasRegistered: boolean;
  client: string;
  clientLogo: string;
}

const Searchresults = ({
  noResults,
  results,
  tabs,
  currentTab,
  filter,
  countTotal,
  searchOption,
  hasRegistered,
  client,
  clientLogo
}) => {
  const show = results.length > 0 || noResults ? true : false;

  const SearchResultsContainer = styled.div`
    grid-area: header;
    color: #5f6062;
    font-size: 16px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4;
    font-weight: 300;

    background: #fff;
    margin-top: 30px;
  `;

  return (
    <HeaderRow>
      {show && (
        <SearchResultsContainer className={`row`}>
          {/* // Tabs */}
          <div className={'col-md-4 col-sm-12 col-xs-12'}>
            <SearchResultsFilters
              tabs={tabs}
              handleFilter={filter}
              currentTab={currentTab}
              countTotal={countTotal}
            />
          </div>
          {/* // Resultss */}
          <div className={'col-md-8 col-sm-12 col-xs-12'}>
            {searchOption === 'place' && <KnowledgeBaseCTA />}

            <SearchResultsList
              results={results}
              noResults={noResults}
              searchOption={searchOption}
              hasRegistered={hasRegistered}
              clientName={client}
              clientLogo={clientLogo}
            />
          </div>
        </SearchResultsContainer>
      )}
    </HeaderRow>
  );
};

export default Searchresults;

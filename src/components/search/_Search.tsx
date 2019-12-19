import * as React from 'react';
import * as _ from 'lodash';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import OptionSwitch from './SearchOptionSwitch';
import { CloseButton } from './CloseButton';
import { withCookies, Cookies } from 'react-cookie';
import { getHashParams } from '../../utils/';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeaderRow } from '../grid';
import IDIdentity from '../ui/IDIdentity';

interface ISearchConfig {
  getAPiUrl: string;
  getclientAlias: string;
  getClientLogoUrl: string;
  getClientLongName: string;
  getHubspotAPiUrl: string;
  getTrackingID: string;
  getWebId: string;
}

interface ISearchAppProps {
  searchConfig: ISearchConfig;
  alias: string;
  clientImage: any;
}

interface ISearchState {
  results: any[];
  currentTab: number;
  searchTerms: string;
  searchOption: string;
  currentResultTerm: string;
  inProgress: boolean;
  noResults: boolean;
  showSearch: boolean;
  tabs: any[];
  hasRegistered: boolean;
  placeholder: string;
}

const HeaderID = styled(HeaderRow)`
  background-color: #f2f2f2;
  height: 50px;
  position: relative;
  z-index: 2000;
`;

const SearchInputFaux = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
  height: 34px;
  padding-left: 30px;
  &:before {
    font-family: 'id-icons';
    content: '\\e62b';
    left: 25px;
    top: 2px;
    color: grey;
    position: relative;
    font-size: 16px;
  }
`;

const SearchInit = styled.input`
  height: 35px;
  line-height: 35px;
  padding: 0 10px 0 35px;
  border: none;
  font-size: 13px;
`;

const FauxWrapper = styled.div`
  width: 100%;
  grid-area: header;
  position: relative;
`;

const ResultScroller = styled.div`
  grid-area: header;
  margin: 0 auto;
`;

const ResultsContainer = styled.div`
  box-shadow: 0 15px 33px -28px grey;
`;
const MainSearchWrapper = styled.div`
  height: 155px;
  background-color: #f2f2f2;
  opacity: 1;
  margin-top: 0;
  background-color: #f2f2f2;
  z-index: 101;
  position: relative;

  .underlay {
    display: block;
  }
`;

const SearchTermInputContainer = styled.div`
  grid-area: header;
  background-color: #f2f2f2;
`;
const SearchTermInput = styled.div`
  background-color: #f2f2f2;
  position: relative;
  padding-bottom: 20px;
  margin: 0 auto;
`;
const SearchInputWrapper = styled(HeaderRow)`
  background-color: #f2f2f2;
`;

class SearchApp extends React.Component<ISearchAppProps, ISearchState> {
  private initialSearchResults: any[] = [];
  private hsCookie = 'id001-hubspot-form-submitted';
  private searchOptionPlaceholders: any = {
    place: 'e.g Adelaide',
    topic: 'e.g Jobs, population',
  };
  private searchConfig: any = {};

  constructor(props: any) {
    super(props);

    const { cookies, alias, longName } = props;
    const kuky = cookies.get(this.hsCookie) || false;
    this.searchConfig = {
      getAPiUrl: 'https://micro.id.com.au/api/search',
      getclientAlias: alias,
      getClientLongName: longName,
      getTrackingID: 'UA-27808229-2',
    };

    this.state = {
      results: [],
      currentTab: 0,
      searchTerms: '',
      searchOption: 'place',
      currentResultTerm: '',
      inProgress: false,
      noResults: false,
      showSearch: false,
      tabs: [],
      hasRegistered: kuky,
      placeholder: 'e.g Adelaide',
    };
  }

  componentDidMount() {
    // if href has query string we want to trigger a search
    if (!_.isUndefined(window.location.href.split('#')[1])) {
      const hashParams = getHashParams();
      const searchTerm = hashParams['s'];
      const searchOption = hashParams['o'];
      this.handleOptionSwitch(searchOption);
      this.setState({ searchOption }, () => {
        if (searchTerm) {
          this.search(searchTerm);
        }
      });
    }
  }

  // great switch statement alternative btw
  private getSearchEndPoint = searchOption => {
    const searchOptionsApis = {
      place: this.searchConfig.getAPiUrl + '/place/' + this.searchConfig.getclientAlias + '/',
      topic:
        this.searchConfig.getAPiUrl +
        '/topic/' +
        this.searchConfig.getclientAlias +
        '/' +
        this.searchConfig.getWebId +
        '/',
    };
    return searchOptionsApis[searchOption] || searchOptionsApis.place;
  };

  private searchFocus = () => {
    this.setState({
      showSearch: true,
    });
  };

  private search = term => {
    const { searchOption } = this.state;

    this.setState({
      inProgress: true,
      noResults: false,
    });

    const query = this.getSearchEndPoint(searchOption) + term;

    fetch(query)
      .then(response => response.json())
      .then(data => {
        this.initialSearchResults = data.results;
        this.setState({
          currentResultTerm: term,
          results: data.results,
          searchTerms: term,
          showSearch: true,
          inProgress: false,
          noResults: data.results.length === 0,
          tabs: data.products,
        });

        if (data.results.length > 0) {
          this.filterResultsByTab();
          this.setUri();
        }
      })
      .catch(error =>
        this.setState({
          results: [],
          inProgress: false,
        }),
      );
  };

  // when searching we need to populate the uri with queries to remember search terms
  private setUri = () => {
    const { searchOption, searchTerms } = this.state;
    const host = window.location.href.split('#')[0];
    window.location.href = host + `#o=${searchOption}&s=${searchTerms}`;
  };

  private handleOptionSwitch = option => {
    this.setState({
      results: [],
      searchTerms: '',
      searchOption: option,
      placeholder: this.searchOptionPlaceholders[option],
    });
  };

  private closeSearch = () => {
    this.setState({
      results: [],
      showSearch: false,
      searchTerms: '',
      noResults: false,
    });
  };

  private updateTerms = searchTerms => {
    this.setState({ searchTerms });
  };

  private filterResultsByTab = (id?: number): void => {
    const { currentTab } = this.state;
    id = !_.isUndefined(id) ? id : currentTab;
    const results =
      id === 0
        ? this.initialSearchResults
        : _.filter(this.initialSearchResults, (result: any) => result.productID === id);
    this.setState({
      results,
      currentTab: id,
    });
  };

  render() {
    const {
      searchOption,
      searchTerms,
      inProgress,
      results,
      hasRegistered,
      currentTab,
      tabs,
      noResults,
      placeholder,
      showSearch,
    } = this.state;

    return (
      <React.Fragment>
        <HeaderID>
          <FauxWrapper>
            <IDIdentity />
            {!showSearch && (
              <SearchInputFaux>
                <SearchInit
                  id="idSearchInit"
                  type="text"
                  maxlength="100"
                  placeholder="Search for places, topics..."
                  onFocus={this.searchFocus}
                />
              </SearchInputFaux>
            )}
          </FauxWrapper>
        </HeaderID>
        {showSearch && (
          <MainSearchWrapper>
            <SearchInputWrapper>
              <SearchTermInputContainer>
                <SearchTermInput>
                  <OptionSwitch
                    activeOption={searchOption}
                    onSwitch={this.handleOptionSwitch}
                    client={this.searchConfig.getClientLongName}
                  />
                  <SearchInput
                    searchOption={searchOption}
                    searchTerms={searchTerms}
                    onUserInput={this.updateTerms}
                    onSearch={this.search}
                    onSearchFocus={this.searchFocus}
                    inProgress={inProgress}
                    close={this.closeSearch}
                    placeholder={placeholder}
                  />
                  <CloseButton handleClick={this.closeSearch} clientLongName={this.searchConfig.getClientLongName} />
                </SearchTermInput>
              </SearchTermInputContainer>
            </SearchInputWrapper>

            <ResultsContainer>
              <ResultScroller>
                <SearchResults
                  noResults={noResults}
                  results={results}
                  tabs={tabs}
                  currentTab={currentTab}
                  filter={this.filterResultsByTab}
                  countTotal={this.initialSearchResults.length}
                  searchOption={searchOption}
                  hasRegistered={hasRegistered}
                  client={this.searchConfig.getClientLongName}
                  clientLogo={this.props.clientImage}
                />
              </ResultScroller>
              {results.length > 0 && <div className={'underlay'} />}
            </ResultsContainer>
          </MainSearchWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default withCookies(SearchApp);

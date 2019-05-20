import React from 'react';

import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';

import GitViewer from './component';

import { PAGINATION_DIRECTION, REPOS_PER_PAGE } from '../../constants/constants';
import getFetchDirection from '../../utils/getFetchDirection';

const NEXT_USER_REPOS = loader('./Queries/NEXT_USER_REPOS.gql');
const PREV_USER_REPOS = loader('./Queries/PREV_USER_REPOS.gql');
const SEARCH_USER = loader('./Queries/SEARCH_USER.gql');

class GitViewerContainer extends React.Component {
  static getSearchResults(loading, data) {
    return loading || !data
      ? null
      : data.search.edges.map(edge => ({ ...edge.node, title: edge.node.login }));
  }

  constructor(props) {
    super(props);

    this.initialState = {
      searchPlaceholder: 'Type user login',
      searchValue: '',
      userQuery: '',
      searchChangeTimeout: null,
      viewingRepo: null,
      selectedRepo: null,
      selectedUserLogin: null,
      pagination: {
        activePage: 1,
      },
      reset: true,
    };

    this.state = this.initialState;
  }

  onSearchChange({ value: searchValue }) {
    const { searchChangeTimeout } = this.state;

    clearTimeout(searchChangeTimeout);
    const searchTimeout = this.applySearchAfterTimeout(searchValue);

    this.setState({ searchValue, searchChangeTimeout: searchTimeout });
  }

  onResultSelect({ title, login }) {
    const { pagination, selectedRepo } = this.initialState;
    this.setState((prevState) => {
      if (prevState.selectedUserLogin === login) {
        return prevState;
      }

      return {
        pagination,
        selectedRepo,
        searchValue: title,
        selectedUserLogin: login,
        reset: false,
      };
    });
  }

  onPageChange(newActivePage, fetchMore) {
    const { PREV } = PAGINATION_DIRECTION;
    const { pagination: { activePage, endCursor, startCursor }, selectedUserLogin } = this.state;

    const fetchDirection = getFetchDirection(activePage, newActivePage);
    const cursor = fetchDirection === PREV ? startCursor : endCursor;

    fetchMore({
      query: fetchDirection === PREV ? PREV_USER_REPOS : NEXT_USER_REPOS,
      variables: { user: selectedUserLogin, limit: REPOS_PER_PAGE, cursor },
      updateQuery: (previousResult, { fetchMoreResult }) => ({ ...fetchMoreResult }),
    }).then(() => {
      this.setState(prevState => ({
        pagination: {
          ...prevState.pagination,
          fetchDirection,
          activePage: newActivePage,
        },
      }));
    });
  }

  setSelectedRepo(selectedRepo) {
    this.setState({ selectedRepo: { ...selectedRepo } });
  }

  setViewingRepo(data) {
    this.setState({ viewingRepo: data });
  }

  setCursors(startCursor, endCursor, hasNextPage, hasPreviousPage) {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage,
      },
    }));
  }

  updateStarState({ data }) {
    const starrable = data.addStar
      ? data.addStar.starrable
      : data.removeStar.starrable;

    this.setState(prevState => ({
      viewingRepo: {
        repository: {
          ...prevState.viewingRepo.repository,
          viewerHasStarred: starrable.viewerHasStarred,
        },
      },
    }));
  }

  resetSearch() {
    this.setState(this.initialState);
  }

  applySearchAfterTimeout(searchValue) {
    return setTimeout(() => {
      if (searchValue.length < 1) {
        return this.setState(this.initialState);
      }

      return this.setState({
        userQuery: searchValue,
      });
    }, 700);
  }

  render() {
    const {
      searchValue,
      userQuery,
      searchPlaceholder,
      selectedUserLogin,
      selectedRepo,
      pagination,
      reset,
      viewingRepo,
    } = this.state;

    return (
      <Query
        query={SEARCH_USER}
        variables={{ user: userQuery }}
        skip={(!userQuery && !reset)}
      >
        {({ loading, error, data }) => {
          if (error) { return `Error! ${error.message}`; }

          return (
            <GitViewer
              updateStarState={repoData => this.updateStarState(repoData)}
              viewingRepo={viewingRepo}
              setViewingRepo={repoData => this.setViewingRepo(repoData)}
              reset={reset}
              onPageChange={(activePage, fetchMore) => this.onPageChange(activePage, fetchMore)}
              setCursors={paginationInfo => this.setCursors(...paginationInfo)}
              pagination={pagination}
              selectedUserLogin={selectedUserLogin}
              setSelectedRepo={newSelectedRepo => this.setSelectedRepo(newSelectedRepo)}
              selectedRepo={selectedRepo}
              resetSearch={() => this.resetSearch()}
              searchPlaceholder={searchPlaceholder}
              searchLoading={loading}
              searchValue={searchValue}
              onSearchChange={(e, newSearchValue) => this.onSearchChange(newSearchValue)}
              onResultSelect={(e, { result }) => this.onResultSelect(result)}
              searchResults={GitViewerContainer.getSearchResults(loading, data)}
            />
          );
        }}
      </Query>
    );
  }
}

export default GitViewerContainer;

import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import GitViewer from './component';

import SEARCH_USER from './Queries/SEARCH_USER.gql';
import NEXT_USER_REPOS from './Queries/NEXT_USER_REPOS.gql';
import PREV_USER_REPOS from './Queries/PREV_USER_REPOS.gql';

import { PAGINATION_DIRECTION } from '../../constants/constants';

class GitViewerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      searchPlaceholder: 'Type user login',
      searchValue: '',
      userQuery: '',
      searchChangeTimeout: null,
      viewingRepo: null,
      selectedRepo: null,
      pagination: {
        fetchDirection: null,
        activePage: 1,
        startCursor: null,
        endCursor: null,
        hasPreviousPage: null,
        hasNextPage: null,
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

  onResultSelect(result) {
    this.setState({ searchValue: result.title, selectedUserLogin: result.login, reset: false });
  }

  onPageChange(newActivePage, fetchMore) {
    const { PREV, NEXT } = PAGINATION_DIRECTION;
    const { pagination: { activePage, endCursor, startCursor }, selectedUserLogin } = this.state;
    const fetchDirection = (activePage - newActivePage) > 0
      ? PREV
      : NEXT;

    const variables = {
      user: selectedUserLogin,
      limit: 3,
      cursor: fetchDirection === PREV ? startCursor : endCursor,
    };

    fetchMore({
      query: fetchDirection === PREV
        ? PREV_USER_REPOS
        : NEXT_USER_REPOS,
      variables,
      notifyOnNetworkStatusChange: true,
      updateQuery: (previousResult, { fetchMoreResult }) => ({ ...fetchMoreResult }),
    });

    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        fetchDirection,
        activePage: newActivePage,
      },
    }), () => console.log(this.state));
  }

  setSelectedRepo(selectedRepo) {
    this.setState({ selectedRepo: { ...selectedRepo } });
  }

  setViewingRepo(data) {
    this.setState({ viewingRepo: data });
  }

  getSearchResults(loading, data) {
    return loading || !data
      ? null
      : data.search.edges.map(edge => ({ ...edge.node, title: edge.node.login }));
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
    }), () => console.log(this.state));
  }

  // updateStarState({ data: { addStar: { starrable } } }) {
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
        skip={!userQuery}
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
              searchResults={this.getSearchResults(loading, data)}
            />
          );
        }}
      </Query>
    );
  }
}

export default GitViewerContainer;

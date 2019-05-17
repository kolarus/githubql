import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import GitViewer from './component';
import SEARCH_USER from './Queries/SEARCH_USER.gql';

class GitViewerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      searchPlaceholder: 'Type user login',
      searchValue: '',
      userQuery: '',
      searchChangeTimeout: null,
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
    this.setState({ searchValue: result.title, selectedUserLogin: result.login });
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

  getSearchResults(loading, data) {
    return loading || !data
      ? null
      : data.search.edges.map(edge => ({ ...edge.node, title: edge.node.login }));
  }

  resetSearch() {
    this.setState({ searchValue: '' });
  }

  setSelectedRepo(selectedRepo) {
    this.setState({ selectedRepo: { ...selectedRepo } });
  }

  render() {
    const {
      searchValue, userQuery, searchPlaceholder, selectedUserLogin, selectedRepo,
    } = this.state;

    return (
      <Query
        query={SEARCH_USER}
        variables={{ user: userQuery }}
        skip={!userQuery}
      >
        {({ loading, error, data }) => {
          if (error) return `Error! ${error.message}`;
          return (
            <GitViewer
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

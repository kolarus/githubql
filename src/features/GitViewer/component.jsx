import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider, Grid, Segment,
} from 'semantic-ui-react';

import { paginationShape, repositoryShape } from '../../utils/shapes';

import Search from '../../components/Search';
import List from './components/List';
import RepositoryInfo from './components/RepositoryInfo';

const GitViewer = (props) => {
  const {
    searchLoading,
    searchValue,
    onSearchChange,
    onResultSelect,
    searchResults,
    searchPlaceholder,
    reposLoading,
    resetSearch,
    setSelectedRepo,
    selectedRepo,
    selectedUserLogin,
    pagination,
    onPageChange,
    reset,
    setCursors,
    setViewingRepo,
    viewingRepo,
    updateStarState,
  } = props;
  return (
    <React.Fragment>
      <Search
        resetSearch={resetSearch}
        searchLoading={searchLoading}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onResultSelect={onResultSelect}
        results={searchResults}
        placeholder={searchPlaceholder}
      />
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <List
              reset={reset}
              setCursors={setCursors}
              onPageChange={onPageChange}
              pagination={pagination}
              selectedUserLogin={selectedUserLogin}
              setSelectedRepo={setSelectedRepo}
              loading={reposLoading}
            />
          </Grid.Column>
          <Grid.Column>
            <RepositoryInfo
              updateStarState={updateStarState}
              viewingRepo={viewingRepo}
              setViewingRepo={setViewingRepo}
              reset={reset}
              selectedRepo={selectedRepo}
            />
          </Grid.Column>
        </Grid>
        <Divider vertical>{'>'}</Divider>
      </Segment>
    </React.Fragment>
  );
};

GitViewer.propTypes = {
  searchLoading: PropTypes.bool,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  setCursors: PropTypes.func.isRequired,
  setViewingRepo: PropTypes.func.isRequired,
  updateStarState: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  setSelectedRepo: PropTypes.func.isRequired,
  reposLoading: PropTypes.bool,
  reset: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape(Object)),
  selectedRepo: PropTypes.shape(Object),
  selectedUserLogin: PropTypes.string,
  viewingRepo: PropTypes.shape({
    repository: PropTypes.shape(repositoryShape),
  }),
  pagination: PropTypes.shape(paginationShape).isRequired,
};

GitViewer.defaultProps = {
  searchLoading: false,
  reposLoading: false,
  selectedRepo: null,
  viewingRepo: null,
  selectedUserLogin: null,
  searchResults: [],
};

export default GitViewer;

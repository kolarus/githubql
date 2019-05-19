import React from 'react';

import {
  Divider, Grid, Segment,
} from 'semantic-ui-react';

import Search from '../../components/Search';
import QueryList from './components/List';
import QueryRepositoryInfo from './components/RepositoryInfo';

const GitViewer = (props) => {
  const {
    searchLoading,
    searchValue,
    onSearchChange,
    onResultSelect,
    searchResults,
    searchPlaceholder,
    reposLoading,
    reposList,
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
            <QueryList
              reset={reset}
              setCursors={setCursors}
              onPageChange={onPageChange}
              pagination={pagination}
              selectedUserLogin={selectedUserLogin}
              setSelectedRepo={setSelectedRepo}
              list={reposList}
              loading={reposLoading}
            />
          </Grid.Column>
          <Grid.Column>
            <QueryRepositoryInfo
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

export default GitViewer;

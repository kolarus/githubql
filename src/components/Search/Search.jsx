import React from 'react';

import PropTypes from 'prop-types';
import { Search as SearchUI, Button } from 'semantic-ui-react';

import style from './search.module.css';

const Search = ({
  searchValue,
  onSearchChange,
  isLoading,
  onResultSelect,
  results,
  searchLoading,
  placeholder,
  resetSearch,
}) => (
  <div className={style.search}>
    <SearchUI
      loading={searchLoading}
      onResultSelect={onResultSelect}
      onSearchChange={onSearchChange}
      results={results}
      value={searchValue}
      placeholder={placeholder}
    />
    <Button
      className={style.button}
      disabled={!searchValue}
      onClick={resetSearch}
    >
      Reset
    </Button>
  </div>
);

export default Search;

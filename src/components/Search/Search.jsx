import React from 'react';
import PropTypes from 'prop-types';

import { Search as SearchUI, Button } from 'semantic-ui-react';

import style from './search.module.css';

const Search = ({
  searchValue,
  onSearchChange,
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

Search.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape(Object)),
};

Search.defaultProps = {
  results: null,
};

export default Search;

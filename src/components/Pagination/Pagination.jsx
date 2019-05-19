import React from 'react';
import PropTypes from 'prop-types';

import { Pagination as PaginationUI } from 'semantic-ui-react';

import style from './pagination.module.scss';

const Pagination = (props) => {
  const {
    totalPages, activePage, onPageChange,
  } = props;
  return (
    <div className={style.paginationWrapper}>
      <PaginationUI
        activePage={activePage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        ellipsisItem={null}
        lastItem={false}
        firstItem={false}
        boundaryRange={0}
        siblingRange={0}
        size="mini"
      />
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

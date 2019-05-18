import React from 'react';

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

export default Pagination;

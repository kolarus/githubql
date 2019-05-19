const destructurePageInfo = (data) => {
  const {
    user: {
      repositories: {
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage,
          hasPreviousPage,
        },
      },
    },
  } = data;
  return [startCursor, endCursor, hasNextPage, hasPreviousPage];
};

export default destructurePageInfo;

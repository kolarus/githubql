import React from 'react';

import DocumentTitle from 'react-document-title';

const withTitle = title => WrappedComponent => props => (
  <DocumentTitle title={title}>
    <WrappedComponent {...props} />
  </DocumentTitle>
);

export default withTitle;

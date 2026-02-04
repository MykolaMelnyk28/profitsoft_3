import BookNewPage from 'pages/bookNew';
import React from 'react';

import PageContainer from './components/PageContainer';
import BackButtonPageContainer from './components/BackButtonPageContainer';

const BookNew = (props) => {
  return (
    <PageContainer>
        <BackButtonPageContainer>
            <BookNewPage {...props} />
        </BackButtonPageContainer>
    </PageContainer>
  );
};

export default BookNew;

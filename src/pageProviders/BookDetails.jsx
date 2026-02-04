import DefaultPage from 'pages/bookDetails';
import React from 'react';

import PageContainer from './components/PageContainer';
import BackButtonPageContainer from './components/BackButtonPageContainer';

const BookDetails = (props) => {
  return (
    <PageContainer>
        <BackButtonPageContainer>
            <DefaultPage {...props} />
        </BackButtonPageContainer>
    </PageContainer>
  );
};

export default BookDetails;

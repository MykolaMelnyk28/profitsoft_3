import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';
import getMessages from './intl';
import ErrorsListener from 'app/components/ErrorsListener';
import ToastListener from 'misc/ui/ToastListener';
import BookNew from './container/BookNew';

function Index(props) {
    const { lang, } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <ErrorsListener />
            <ToastListener />
            <BookNew {...props} />
        </IntlProvider>
    );
}

export default Index;
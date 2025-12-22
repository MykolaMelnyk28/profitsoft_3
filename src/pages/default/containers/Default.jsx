import { useIntl } from 'react-intl';
import BookList from '../components/BookList';
import { useEffect } from 'react';
import useLocationSearch from 'misc/hooks/useLocationSearch';

function Default() {
    const { formatMessage } = useIntl();
    
    const {lang} = useLocationSearch();

    useEffect(() => {
        document.title = formatMessage({ id: 'page.metadata.title' });
    }, [lang]);
    
    return (
        <BookList />
    );
}

export default Default;

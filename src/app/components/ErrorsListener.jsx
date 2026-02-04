import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import bookActions from 'app/actions/books';
import authorActions from 'app/actions/authors';
import genreActions from 'app/actions/genres';

export default function ErrorsListener() {
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const booksErrors = useSelector(state => state.books.errors);
    const authorsErrors = useSelector(state => state.authors.errors);
    const genresErrors = useSelector(state => state.genres.errors);

    const prevErrorsRef = useRef({
        books: { global: [], local: [] },
        authors: { global: [], local: [] },
        genres: { global: [], local: [] },
    });

    useEffect(() => {
        const slices = [
            { name: 'books', errors: booksErrors, setter: bookActions.setBookErrors },
            { name: 'authors', errors: authorsErrors, setter: authorActions.setAuthorErrors },
            { name: 'genres', errors: genresErrors, setter: genreActions.setGenreErrors },
        ];

        slices.forEach(slice => {
            const prevErrors = prevErrorsRef.current[slice.name] || { global: [], local: [] };
            const newErrors = slice.errors?.global?.filter(e => !prevErrors.global.includes(e)) ?? [];

            newErrors.forEach(err => {
                const message = formatMessage({ id: err.messageId }, err.values);
                toast.error(message);
            });


            if (slice?.errors?.global?.length > 0) {
                dispatch(slice.setter({...slice.errors, global: []}));
            }

            prevErrorsRef.current[slice.name] = slice.errors;
        });
    }, [booksErrors, authorsErrors, genresErrors, formatMessage, dispatch]);

    return null;
}

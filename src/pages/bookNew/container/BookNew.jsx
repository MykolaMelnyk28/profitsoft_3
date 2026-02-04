import BookDetailsForm from "app/components/BookDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionsBooks from './../../../app/actions/books';
import { useEffect } from "react";
import { useIntl } from "react-intl";
import useLocationSearch from "misc/hooks/useLocationSearch";
import Loading from "components/Loading";

function BookNew() {
    const { formatMessage } = useIntl();
    const { lang } = useLocationSearch();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.books);

    useEffect(() => {
        document.title = formatMessage({ id: 'page.metadata.title' });
    }, [lang, formatMessage]);


    const handleSubmit = (formData) => {
        dispatch(actionsBooks.createBook(formData));
    };

    const onSuccess = () => navigate('/default');

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <BookDetailsForm
                    mode="create"
                    onSubmit={handleSubmit}
                    onCancell={onSuccess}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}

export default BookNew;
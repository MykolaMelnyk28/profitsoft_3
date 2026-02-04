import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import actionsBooks from './../../../app/actions/books';
import Loading from "components/Loading";
import BookDetailsForm from "../../../app/components/BookDetailsForm";
import { Status } from "app/constants/bookActionTypes";
import { useParams } from "react-router-dom";
import BookView from "../components/BookView";
import useSecuredCallback from "misc/hooks/useSecuredCallback";

function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, currentBook } = useSelector(state => state.books);

    const [readOnly, setReadOnly] = useState(true);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        dispatch(actionsBooks.fetchBookDetailsById(parseInt(id)));
    }, [dispatch, id]);

    useEffect(() => {
        document.title = currentBook.title;
    }, [currentBook.title]);

    useEffect(() => {
        if (readOnly && currentBook) {
            setFormData({
                title: currentBook.title ?? '',
                authorId: currentBook.author?.id ?? 0,
                yearPublished: currentBook.yearPublished ?? 0,
                genreIds: currentBook.genres?.map(x => x.id) ?? [],
                pages: currentBook.pages ?? 0,
                description: currentBook.description ?? '',
            });
        }
    }, [currentBook, readOnly]);

    const handleEditButtonClick = () => setReadOnly(false);
    const handleCancellEdit = () => setReadOnly(true);

    const handleSubmit = useSecuredCallback((updatedData) => {
        dispatch(actionsBooks.updateBookById(id, updatedData));
    });

    const onSuccess = () => {
        setReadOnly(true);
        dispatch(actionsBooks.setBooksStatus(Status.idle));
    };

    return (
        <>
            {isLoading || !currentBook ? (
                <Loading />
            ) : readOnly ? (
                <BookView
                    currentBook={currentBook}
                    onEditClick={handleEditButtonClick}
                />
            ) : (
                <BookDetailsForm
                    mode="update"
                    defaultValue={formData}
                    onSubmit={handleSubmit}
                    onCancell={handleCancellEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}

export default BookDetails;
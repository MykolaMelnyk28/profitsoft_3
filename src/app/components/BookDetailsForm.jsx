import Button from "components/Button";
import Stack from "components/Stack";
import Paper from "components/Paper";
import CardContent from "components/CardContent";
import TextField from "components/TextField";
import SelectOptions from "pages/default/components/BookList/SelectOptions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import actionsGenres from 'app/actions/genres';
import actionsAuthors from 'app/actions/authors';
import actionsBooks from 'app/actions/books';
import { useIntl } from "react-intl";
import Typography from "components/Typography";
import { Status } from "app/constants/bookActionTypes";

const modes = {
    create: 'create',
    update: 'update'
}

const errorTypes = {
    validationError: 'error.validation',
    required: 'error.validation.field.required',
    positiveValue: 'error.validation.number.positive',
    outOfRange: 'error.validation.number.outOfRange',
};

function BookDetailsForm({ mode = modes.create, defaultValue, onSubmit, onCancell, onSuccess }) {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const { isLoading: isAuthorsLoading, authors } = useSelector(state => state.authors);
    const { isLoading: isGenresLoading, genres } = useSelector(state => state.genres);
    const { errors: bookErrors, status } = useSelector(state => state.books);


    const [formData, setFormData] = useState(() => ({
        title: defaultValue?.title ?? '',
        authorId: defaultValue?.authorId ?? 0,
        yearPublished: defaultValue?.yearPublished ?? 0,
        genreIds: defaultValue?.genreIds ?? [],
        pages: defaultValue?.pages ?? 0,
        description: defaultValue?.description ?? '',
    }));

    const [errors, setErrors] = useState({
        total: [],
        title: [],
        description: [],
        authorId: [],
        genreIds: [],
        yearPublished: [],
        pages: []
    });

    const getFormateErrors = (key) =>
        errors[key].map(x => formatMessage({ id: x.messageId }, x.values)).join("; ");

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, total: [], [name]: [] }));
    };

    const handleChangeEvent = (e) => handleChange(e.target.name, e.target.value);

    const validateFormData = () => {
        const newErrors = { total: [], title: [], description: [], authorId: [], genreIds: [], yearPublished: [], pages: [] };

        if (!formData.title?.trim()) newErrors.title.push({ messageId: errorTypes.required });
        if (!formData.authorId) newErrors.authorId.push({ messageId: errorTypes.required });
        if (!formData.genreIds.length) newErrors.genreIds.push({ messageId: errorTypes.required });
        if (!formData.pages) newErrors.pages.push({ messageId: errorTypes.required });
        else if (formData.pages <= 0) newErrors.pages.push({ messageId: errorTypes.positiveValue });

        if (!formData.yearPublished) newErrors.yearPublished.push({ messageId: errorTypes.required });
        else if (formData.yearPublished < 1450 || formData.yearPublished > new Date().getFullYear())
            newErrors.yearPublished.push({ messageId: errorTypes.outOfRange, values: { min: 1450, max: new Date().getFullYear() } });

        setErrors(newErrors);
        return newErrors;
    };

    const hasErrors = (errors) => Object.values(errors).some(arr => arr.length > 0);

    const handleSubmit = () => {
        const validationErrors = validateFormData();
        if (hasErrors(validationErrors)) {
            dispatch(actionsBooks.setBookErrors(prev => ({ ...prev, global: [...prev.global, { messageId: errorTypes.validationError }] })));
            return;
        }
        onSubmit(formData);
    };

    const handleCancell = () => onCancell();

    const okButtonLabel = mode === modes.update
        ? formatMessage({ id: 'bookForm.updateButton.title' })
        : formatMessage({ id: 'bookForm.createButton.title' });

    useEffect(() => {
        if (!bookErrors.local?.length) return;

        setErrors(prev => ({ ...prev, total: bookErrors.local }));

        dispatch(actionsBooks.setBookErrors({ ...bookErrors, local: [] }));
    }, [bookErrors.local]);

    useEffect(() => {
        if (status === Status.success) {
            onSuccess();
        }
    }, [status]);

    return (
        <Paper>
            <CardContent>
                <Stack spacing={2}>
                    {errors.total?.map((x, idx) => (
                        <Typography key={idx} color="error">
                            {formatMessage({ id: x.messageId }, x.values)}
                        </Typography>
                    ))}

                    <TextField
                        required
                        label={formatMessage({ id: 'bookForm.fields.title.label' })}
                        name="title"
                        value={formData.title}
                        onChange={handleChangeEvent}
                        isError={errors.title.length > 0}
                        helperText={getFormateErrors('title')}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label={formatMessage({ id: 'bookForm.fields.description.label' })}
                        name="description"
                        value={formData.description}
                        onChange={handleChangeEvent}
                    />

                    <SelectOptions
                        required
                        defaultValue={formData.authorId}
                        label={formatMessage({ id: 'bookForm.fields.author.label' })}
                        loading={isAuthorsLoading}
                        items={authors}
                        name="authorId"
                        onSelect={value => handleChange('authorId', value)}
                        fetchOptions={filter => dispatch(actionsAuthors.fetchAuthorPage(filter))}
                        getOptionLabel={o => `${o.firstName} ${o.lastName}`}
                        getOptionKey={o => o.id}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        size="small"
                        multiple={false}
                        isError={errors.authorId.length > 0}
                        helperText={getFormateErrors('authorId')}
                    />

                    <SelectOptions
                        required
                        defaultValue={formData.genreIds}
                        label={formatMessage({ id: 'bookForm.fields.genres.label' })}
                        loading={isGenresLoading}
                        items={genres}
                        name="genreIds"
                        onSelect={value => handleChange('genreIds', value)}
                        fetchOptions={filter => dispatch(actionsGenres.fetchGenrePage(filter))}
                        getOptionLabel={o => o.name}
                        getOptionKey={o => o.id}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        size="small"
                        isError={errors.genreIds.length > 0}
                        helperText={getFormateErrors('genreIds')}
                    />

                    <TextField
                        required
                        inputType="number"
                        label={formatMessage({ id: 'bookForm.fields.yearPublished.label' })}
                        name="yearPublished"
                        InputProps={{ inputProps: { min: 1450, max: new Date().getFullYear() } }}
                        value={formData.yearPublished}
                        onChange={handleChangeEvent}
                        isError={errors.yearPublished.length > 0}
                        helperText={getFormateErrors('yearPublished')}
                    />

                    <TextField
                        required
                        inputType="number"
                        label={formatMessage({ id: 'bookForm.fields.pages.label' })}
                        name="pages"
                        InputProps={{ inputProps: { min: 1 } }}
                        value={formData.pages}
                        onChange={handleChangeEvent}
                        isError={errors.pages.length > 0}
                        helperText={getFormateErrors('pages')}
                    />

                    <Stack direction="row" justifyContent="center" spacing={1}>
                        <Button onClick={handleSubmit}>{okButtonLabel}</Button>
                        <Button colorVariant="secondary" onClick={handleCancell}>
                            {formatMessage({ id: 'bookForm.cancellButton.title' })}
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Paper>
    );
}

export default BookDetailsForm;

import SelectSort from "./SelectSort";
import Stack from 'components/Stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from 'components/Button';
import RangeInput from './RangeInput';
import { useDebounce } from '@uidotdev/usehooks';
import SelectOptions from './SelectOptions';
import { useDispatch, useSelector } from 'react-redux';
import actionsGenres from 'app/actions/genres';
import actionsAuthors from 'app/actions/authors';
import TextField from 'components/TextField';
import { useIntl } from "react-intl";
import useLocationSearch from "misc/hooks/useLocationSearch";

function BookFilters({
    filter: filterFromProps,
    onFilterChange
}) {
    const { formatMessage } = useIntl();
    const { lang } = useLocationSearch();

    const sortOptions = useMemo(() => {
        return [
            {
                name: formatMessage({ id: 'page.filter.sortOptions[0].name' }),
                value: "title"
            },
            {
                name: formatMessage({ id: 'page.filter.sortOptions[1].name' }),
                value: "author.firstName"
            },
            {
                name: formatMessage({ id: 'page.filter.sortOptions[2].name' }),
                value: "yearPublished"
            },
            {
                name: formatMessage({ id: 'page.filter.sortOptions[3].name' }),
                value: "pages"
            }
        ];
    }, [lang]);


    const dispatch = useDispatch();
    const {
        authors,
        isLoading: isAuthorsLoading,
    } = useSelector(state => state.authors)

    const {
        genres,
        isLoading: isGenresLoading,
    } = useSelector(state => state.genres)

    const [filter, setFilter] = useState(filterFromProps);
    const [query, setQuery] = useState(filterFromProps?.query ?? '');
    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        setFilter(filterFromProps);
        setQuery(filterFromProps?.query ?? '');
    }, [filterFromProps]);


    const updateField = useCallback((key, value) => {
        setFilter(prev => {
            if (prev[key] === value) return prev;

            if (Array.isArray(value) && Array.isArray(prev[key])) {
                if (
                    value.length === prev[key].length &&
                    value.every((v, i) => v === prev[key][i])
                ) {
                    return prev;
                }
            }

            return { ...prev, [key]: value };
        });
    }, []);

    const handleClickApply = () => {
        onFilterChange(prev => ({ ...prev, ...filter, query: debouncedQuery }));
    };

    const defaultAuthorSelectValue = filter.authorIds ?? [];
    const defaultGenreSelectValue = filter.genreIds ?? [];

    const fetchAuthors = useCallback(
        (filter) => dispatch(actionsAuthors.fetchAuthorPage(filter)),
        [dispatch]
    );

    const fetchGenres = useCallback(
        (filter) => dispatch(actionsGenres.fetchGenrePage(filter)),
        [dispatch]
    );

    const clearFilter = () => {
        onFilterChange({});
    };

    return (
        <Stack spacing={2}>
            <TextField
                value={query}
                onChange={e => setQuery(e.target.value)}
                label={formatMessage({ id: 'page.list.filter.searchInput.label' })}
                size="medium"
            />

            <Stack direction="row" flexWrap="wrap" spacing={2}>
                <Stack flex={1} spacing={1}>
                    <SelectOptions
                        defaultValue={defaultAuthorSelectValue}
                        label={formatMessage({ id: 'page.list.filter.authors.label' })}
                        loading={isAuthorsLoading}
                        items={authors}
                        onSelect={ids => updateField('authorIds', ids)}
                        fetchOptions={fetchAuthors}
                        getOptionLabel={o => `${o.firstName} ${o.lastName}`}
                        getOptionKey={o => o.id}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        size="small"
                    />
                    <SelectOptions
                        defaultValue={defaultGenreSelectValue}
                        label={formatMessage({ id: 'page.list.filter.genres.label' })}
                        loading={isGenresLoading}
                        items={genres}
                        onSelect={ids => updateField('genreIds', ids)}
                        fetchOptions={fetchGenres}
                        getOptionLabel={o => o.name}
                        getOptionKey={o => o.id}
                        isOptionEqualToValue={(o, v) => o.id === v.id}
                        size="small"
                    />
                </Stack>

                <RangeInput
                    defaultMinValue={filter?.minYearPublished ?? ''}
                    defaultMaxValue={filter?.maxYearPublished ?? ''}
                    min={1450}
                    max={new Date().getFullYear()}
                    minLabel={formatMessage({ id: 'page.list.filter.yearPublishedRange.minLabel' })}
                    maxLabel={formatMessage({ id: 'page.list.filter.yearPublishedRange.maxLabel' })}
                    onMinChange={value => updateField('minYearPublished', value)}
                    onMaxChange={value => updateField('maxYearPublished', value)}
                />

                <RangeInput
                    defaultMinValue={filter?.minPages ?? ''}
                    defaultMaxValue={filter?.maxPages ?? ''}
                    min={0}
                    max={10000}
                    minLabel={formatMessage({ id: 'page.list.filter.pagesRange.minLabel' })}
                    maxLabel={formatMessage({ id: 'page.list.filter.pagesRange.maxLabel' })}
                    onMinChange={value => updateField('minPages', value)}
                    onMaxChange={value => updateField('maxPages', value)}
                />
            </Stack>

            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <SelectSort
                    defaultValue={filter?.sort ?? sortOptions[0].value}
                    onSelect={value => updateField('sort', value)}
                    sortOptions={sortOptions}
                    size="small"
                />
                <Stack direction="row">
                    <Button onClick={clearFilter}>
                        {formatMessage({ id: 'page.list.filter.resetButton.title' })}
                    </Button>
                    <Button onClick={handleClickApply}>
                        {formatMessage({ id: 'page.list.filter.applyButton.title' })}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default BookFilters;
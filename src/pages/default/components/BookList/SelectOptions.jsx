import FormControl from "components/FormControl";
import { useDebounce } from "@uidotdev/usehooks";
import Autocomplete from "components/Autocomplete";
import { useEffect, useMemo, useState } from "react";

function SelectOptions({
    required = false,
    defaultValue,
    label,
    loading,
    items,
    onSelect,
    getOptionLabel,
    getOptionKey,
    isOptionEqualToValue,
    fetchOptions,
    size = "small",
    multiple = true,
    isError = false,
    helperText,
    name,
}) {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const toIds = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return [val];
    };

    const [valueIds, setValueIds] = useState(() => toIds(defaultValue));

    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        setPage(prev => (prev === 0 ? prev : 0));
        fetchOptions({
            query: debouncedSearch,
            page: 0,
            size: 20,
        });
    }, [debouncedSearch]);

    const loadMore = () => {
        if (!loading && items.totalPages > page + 1) {
            const next = page + 1;
            setPage(next);
            fetchOptions({
                query: debouncedSearch,
                page: next,
                size: 20,
            });
        }
    };

    const options = useMemo(() => {
        const map = new Map();
        (items.content || []).forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
    }, [items.content]);

    const selectedOptions = useMemo(() => {
        if (multiple) {
            return options.filter(o => valueIds.includes(o.id));
        }
        const id = valueIds[0];
        if (!id) return null;
        return options.find(o => o.id === id) || null;
    }, [options, valueIds, multiple]);

    const handleSelect = (_, newValue) => {
        if (multiple) {
            const arr = (newValue || []).map((o) => o.id);
            setValueIds(arr);
            setSearch('');
            onSelect && onSelect(arr);
        } else {
            const id = newValue?.id ?? null;
            setValueIds(id ? [id] : []);
            setSearch('');
            onSelect && onSelect(id);
        }
    };

    const handleInputChange = (_, inputValue) => {
        setSearch(inputValue);
    };

    return (
        <FormControl size={size}>
            <Autocomplete
                required={required}
                multiple={multiple}
                options={options}
                value={selectedOptions}
                loading={loading}
                onChange={handleSelect}
                inputValue={search}
                onInputChange={handleInputChange}
                clearOnBlur={false}
                isOptionEqualToValue={isOptionEqualToValue}
                getOptionLabel={getOptionLabel}
                getOptionKey={getOptionKey}
                ListboxProps={{
                    onScroll: (e) => {
                        const list = e.currentTarget;
                        if (list.scrollTop + list.clientHeight >= list.scrollHeight - 1) {
                            loadMore();
                        }
                    },
                }}
                inputLabel={label}
                size={size}
                isError={isError}
                helperText={helperText}
                name={name}
            />
        </FormControl>
    );
}

export default SelectOptions;
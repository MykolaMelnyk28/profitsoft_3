import { Checkbox, FormControl, FormControlLabel, FormLabel, Stack } from "@mui/material";
import MenuItem from "components/MenuItem";
import Select from "components/Select";
import Typography from "components/Typography";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

function SelectSort({
  defaultValue,
  onSelect,
  sortOptions,
  size
}) {
  const { formatMessage } = useIntl();
  const [defaultProperty, defaultIsDescending] = useMemo(() => {
    const parts = defaultValue?.split(',');
    const p = parts[0]?.trim();
    const d = parts[1]?.trim();
    return [p, d?.toLowerCase() === 'desc'];
  }, [defaultValue]);

  const [selectedPropertySort, setSelectedPropertySort] = useState(defaultProperty);
  const [isDescendingSort, setDescendingSort] = useState(defaultIsDescending ?? false);

  useEffect(() => {
    const newSort = isDescendingSort
      ? `${selectedPropertySort},desc`
      : `${selectedPropertySort},asc`;
    onSelect(newSort);
  }, [selectedPropertySort, isDescendingSort, onSelect]);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Typography
        variant={'caption'}
        align="center"
      >
        {formatMessage({ id: 'page.list.filter.sortSelect.label' })}
      </Typography>
      <Select
        value={selectedPropertySort}
        onChange={(e) => setSelectedPropertySort(e.target.value)}
        size={size}
        
      >
        {sortOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={isDescendingSort}
            onChange={(e) => setDescendingSort(e.target.checked)}
            size={size}
          />
        }
        label={<Typography>{formatMessage({ id: 'page.list.filter.sortSelect.isDescending.label' })}</Typography>}
      />
    </Stack>
  );
}

export default SelectSort;
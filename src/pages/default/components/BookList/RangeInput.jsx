import { FormControl, Stack } from "@mui/material";
import TextField from "components/TextField";
import { useEffect, useState } from "react";

function RangeInput({
    defaultMinValue,
    defaultMaxValue,
    min,
    max,
    minLabel,
    maxLabel,
    onMinChange,
    onMaxChange,
}) {
    const [minLocal, setMinLocal] = useState(defaultMinValue ?? '');
    const [maxLocal, setMaxLocal] = useState(defaultMaxValue ?? '');

    useEffect(() => {
        setMinLocal(defaultMinValue ?? '');
    }, [defaultMinValue]);

    useEffect(() => {
        setMaxLocal(defaultMaxValue ?? '');
    }, [defaultMaxValue]);

    const handleMinChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setMinLocal(value);
        onMinChange?.(value);
    };

    const handleMaxChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setMaxLocal(value);
        onMaxChange?.(value);
    };

    return (
        <FormControl size="small">
            <Stack spacing={1}>
                <TextField
                    type="number"
                    value={minLocal}
                    onChange={handleMinChange}
                    label={minLabel}
                    InputProps={{ inputProps: { min, max } }}
                />
                <TextField
                    type="number"
                    value={maxLocal}
                    onChange={handleMaxChange}
                    label={maxLabel}
                    InputProps={{ inputProps: { min, max } }}
                />
            </Stack>
        </FormControl>
    );
}

export default RangeInput;
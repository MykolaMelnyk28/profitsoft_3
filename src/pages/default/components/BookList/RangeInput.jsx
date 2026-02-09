import Box from "components/Box";
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
    fullWidth,
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
        <Box 
            display="flex"
            flexDirection="column"
            gap={1}
            fullWidth={fullWidth}
        >
            <TextField
                fullWidth={fullWidth}
                type="number"
                value={minLocal}
                onChange={handleMinChange}
                label={minLabel}
                InputProps={{ inputProps: { min, max } }}
            />
            <TextField
                fullWidth={fullWidth}
                type="number"
                value={maxLocal}
                onChange={handleMaxChange}
                label={maxLabel}
                InputProps={{ inputProps: { min, max } }}
            />
        </Box>
    );
}

export default RangeInput;
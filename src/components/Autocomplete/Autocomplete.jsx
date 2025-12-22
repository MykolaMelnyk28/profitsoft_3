import AutocompleteMUI from "@mui/material/Autocomplete";
import TextField from "components/TextField";

const variants = {
  standard: 'standard',
  outlined: 'outlined',
};

const sizes = {
  medium: 'medium',
  small: 'small',
};

function Autocomplete({
    multiple,
    options,
    value,
    loading,
    onChange,
    inputValue,
    onInputChange,
    clearOnBlur,
    isOptionEqualToValue,
    getOptionLabel,
    getOptionKey,
    ListboxProps,
    variant = variants.standard,
    size = sizes.medium,
    inputLabel,
    required = false,
    isError = false,
    helperText,
    name,
}) {
    return (
        <AutocompleteMUI
            multiple={multiple}
            required={required}
            options={options}
            value={value}
            loading={loading}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={onInputChange}
            clearOnBlur={clearOnBlur}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            getOptionKey={getOptionKey}
            ListboxProps={ListboxProps}
            size={size}
            variant={variant}
            renderInput={params => {
                return <TextField
                    id={params.id}
                    required={required}
                    disabled={params.disabled}
                    InputLabelProps={params.InputLabelProps}
                    InputProps={params.InputProps}
                    AdornmentStart={params.InputProps.startAdornment}
                    AdornmentEnd={params.InputProps.endAdornment}
                    fullWidth={params.fullWidth}
                    inputProps={params.inputProps}
                    isError={isError}
                    helperText={helperText}
                    size={params.size}
                    label={inputLabel}
                    name={name}
                />
            }}
        />
    );
}

export default Autocomplete;
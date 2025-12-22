import React from 'react';
import SelectMui from '@mui/material/Select';
import useTheme from 'misc/hooks/useTheme';

const variants = {
  standard: 'standard',
  outlined: 'outlined',
};

const sizes = {
  medium: 'medium',
  small: 'small',
};

const colorVariants = {
  header: 'header',
  primary: 'primary',
};

const Select = ({
  disabled = false,
  disableUnderline = false,
  children,
  fullHeight = true,
  fullWidth = false,
  multiple = false,
  onChange,
  renderValue,
  size = sizes.medium,
  value,
  variant = variants.standard,
  colorVariant = colorVariants.primary,
}) => {
  const { theme } = useTheme();
  return (
    <SelectMui
      disabled={disabled}
      disableUnderline={disableUnderline}
      fullWidth={fullWidth}
      MenuProps={{
        PaperProps: {
          sx: { maxHeight: fullHeight ? '100%' : '300px' },
        },
      }}
      multiple={multiple}
      onChange={onChange}
      renderValue={renderValue}
      sx={{
        '.MuiSelect-select': {
          alignItems: 'center',
          display: 'flex',
          background: disabled && 'rgba(0, 0, 0, 0.05) !important',
          borderBottom: `1px solid ${theme.input.color[colorVariant].border}`,
          color: theme.input.color[colorVariant].text.primary,
          opacity: disabled && '0.4',
          '&:hover': !disabled
            ? {
              marginBottom: '-0.5px !important',
              borderBottom: `2px solid ${theme.input.color[colorVariant].border}`,
            }
            : {},
        },
      }}
      size={size}
      value={value}
      variant={variant}
    >
      {children}
    </SelectMui>
  );
};

export default Select;

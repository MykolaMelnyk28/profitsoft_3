import React from 'react';
import { createUseStyles } from 'react-jss';
import useTheme from 'misc/hooks/useTheme';
import PaginationMUI from '@mui/material/Pagination';

const getClasses = createUseStyles(theme => ({
  pagination: {

  },
}));

function Pagination(props) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  return (
    <PaginationMUI
      {...props}
      className={classes.pagination}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default Pagination;

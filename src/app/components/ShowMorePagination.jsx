import Pagination from "components/Pagination";
import Button from "components/Button";
import useTheme from "misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import { useIntl } from "react-intl";

const getClasses = createUseStyles((theme) => ({
  pagination_container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: '10px',
  }
}));

function ShowMorePagination({ 
  totalPages, 
  page, 
  onPageChange, 
  onClickShowMore, 
  hideShowMoreButton
}) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const { formatMessage } = useIntl();

  const isShowFirstLastButtons = totalPages > 2;

  const handlePageChange = (_, value) => {
    onPageChange(value);
  };

  return (
    <div className={classes.pagination_container}>
      {hideShowMoreButton && (
        <Button onClick={onClickShowMore}>
          { formatMessage({id: 'page.list.pagination.showMore.title'}) }
        </Button> 
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        showFirstButton={isShowFirstLastButtons}
        showLastButton={isShowFirstLastButtons}
      />
    </div>
  );
}

export default ShowMorePagination;
import Button from "components/Button";
import Typography from "components/Typography";
import { useMemo } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CardContent from "components/CardContent";
import Property from "app/components/Property";
import { CardHeader, Divider, Paper, Stack } from "@mui/material";
import { useIntl } from "react-intl";

function BookView({
    currentBook,
    onEditClick
}) {
    const { formatMessage } = useIntl();
    const genreStr = useMemo(() => {
        const genres = currentBook?.genres;
        if (!genres) return [];
        return currentBook.genres.map(x => x.name).join(', ');
    }, [currentBook]);

    return (
        <Paper>
            <CardHeader
                title={<Typography variant="bigTitle">{currentBook.title}</Typography>}
                action={<Button onClick={onEditClick}><EditIcon /></Button>}
            />
            <CardContent >
                <Stack spacing={2}>
                    <Typography variant="subTitle">
                        <strong>
                            {formatMessage({ id: 'bookForm.fields.description.label' })}
                        </strong>
                    </Typography>
                    {currentBook.description ? (
                        <Typography variant="subTitle" color="text.secondary">{currentBook.description}</Typography>
                    ) : (
                        <Typography color="text.secondary">
                            {formatMessage({ id: 'page.book.details.missingDescription'})}
                        </Typography>
                    )}
                    <Divider />
                    <Typography variant="subTitle">
                        {formatMessage({ id: 'page.book.details.characteristics.label'})}
                    </Typography>
                    <Stack spacing={1}>
                        <Property 
                            label={formatMessage({id: 'bookForm.fields.author.label'})}
                            value={`${currentBook.author?.firstName ?? ''} ${currentBook.author?.lastName ?? ''}`} 
                        />
                        <Property 
                            label={formatMessage({id: 'bookForm.fields.yearPublished.label'})}
                            value={currentBook.yearPublished}
                        />
                        <Property 
                            label={formatMessage({id: 'bookForm.fields.pages.label'})}
                            value={currentBook.pages}
                        />
                        <Property 
                            label={formatMessage({id: 'bookForm.fields.genres.label'})}
                            value={genreStr}
                        />
                    </Stack>
                </Stack>
            </CardContent>
        </Paper>
    );
}

export default BookView;
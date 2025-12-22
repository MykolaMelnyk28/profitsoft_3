import Card from "components/Card";
import CardTitle from "components/CardTitle";
import { useCallback, useState } from "react";
import DeleteDialog from "../DeleteDialog";
import { useDispatch } from "react-redux";
import actionsBooks from '../../../../app/actions/books';
import CardContent from "components/CardContent";
import Link from "components/Link";
import styles from './styles.module.css';
import Typography from "components/Typography";
import { Button, CardHeader, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from "react-router-dom";

function BookItem({ item, onDelete }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isHover, setHover] = useState(false); 
    
    const onMouseEnter = () => {
        setHover(true);
    };

    const onMouseLeave = () => {
        setHover(false);
    };

    const onDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const onDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const onDeleteDialogCancell = () => {
        setDeleteDialogOpen(false);
    };

    const onDeleteDialogOk = () => {
        setDeleteDialogOpen(false);
        onDelete(item);
    };

    return (
        <>
            <Card 
                variant="paper"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <CardHeader
                    title={
                        <Typography variant="title">
                            <Link
                                to={{ pathname: `/details/${item.id}` }}
                                state={{from: location}}
                            >
                                {item?.title}
                            </Link>
                        </Typography>
                    }
                    subheader={
                        <Typography variant="subTitle" color="text.secondary">
                            {item.author?.firstName + ' ' + item?.author?.lastName}
                        </Typography>
                    }
                    action={isHover && (
                        <Button onClick={onDeleteDialogOpen}>
                            <DeleteIcon   />
                        </Button>
                    )}
                />
                <CardContent>
                    <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                            {item.yearPublished}
                        </Typography>
                        <Typography>
                            {item.genres?.map(g => g.name).join(", ")}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
            <DeleteDialog
                isOpen={deleteDialogOpen}
                onOpen={onDeleteDialogOpen}
                onClose={onDeleteDialogClose}
                onDelete={onDeleteDialogOk}
                onCancell={onDeleteDialogCancell}
            />
        </>
    );
}

export default BookItem;
import DialogActions from 'components/DialogActions';
import DialogTitle from 'components/DialogTitle';
import Button from "components/Button";
import Dialog from "components/Dialog";
import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";

function DeleteDialog({ isOpen, onOpen, onClose, onDelete, onCancell }) {
    const { formatMessage } = useIntl();

    const handleDialogClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleDelete = useCallback(() => {
        onDelete();
    }, [onDelete]);

    useEffect(() => {
        if (isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleDialogClose}
        >
            <DialogTitle>{formatMessage({ id: 'page.list.deleteDialog.message' })}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDelete}>
                    {formatMessage({ id: 'page.list.deleteDialog.okButton' })}
                </Button>
                <Button onClick={handleDialogClose}>
                    {formatMessage({ id: 'page.list.deleteDialog.cancellButton' })}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;
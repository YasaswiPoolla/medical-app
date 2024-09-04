import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import { loginSnackWidth } from '../Utils';
import { CLICK_AWAY_EVENT, SNACK_HIDE_DURATION, snackPosition, snackStyle } from '../Utils';

const ErrorSnack = ({ open, onClose, errorMessage }) => {
    const [snackOpen, setSnackOpen] = useState(open);

    useEffect(() => {
        setSnackOpen(open);
    }, [open]);

    const handleClose = (event, reason) => {
        if (reason === CLICK_AWAY_EVENT) {
            return;
        }

        setSnackOpen(false);

        if (onClose) {
            onClose();
        }
    };

    return (
        <Snackbar open={snackOpen} autoHideDuration={SNACK_HIDE_DURATION} onClose={handleClose} anchorOrigin={snackPosition} style={loginSnackWidth}>
            <Alert
                severity="error"
                variant="filled"
                sx={snackStyle}
                onClose={handleClose}
            >
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnack;

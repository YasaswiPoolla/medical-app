import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import { CLICK_AWAY_EVENT, SNACK_HIDE_DURATION, warnAlertStyles, warnSnackPosition, warnSnackStyles} from '../Utils';

const WarnSnack = ({ open, onClose, successMessage,className }) => {
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={SNACK_HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={warnSnackPosition}
        style={warnSnackStyles}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={warnAlertStyles}
          className={className}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    );
}

export default WarnSnack;

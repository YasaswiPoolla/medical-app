import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import { CLICK_AWAY_EVENT, SNACK_HIDE_DURATION } from '../Utils';

const LoginSnack = ({ open, onClose, successMessage }) => {
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
        
                
                <div style={{height:'50px',marginTop:'-50px'}} className='mb-2'>
                <Snackbar open={snackOpen} autoHideDuration={SNACK_HIDE_DURATION} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "" }} sx={{position:'relative',width:'100%'}}>
                <Alert
                severity="error"
                variant="filled"
                sx={{ width: '28%',fontSize:'14px',position:'fixed' }}
                onClose={handleClose}
            >
                {successMessage}
                
            </Alert>
        </Snackbar>
        </div> 
    );
}

export default LoginSnack;

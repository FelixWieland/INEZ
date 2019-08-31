import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CSessionEvents = (props) => {
    const { className, message, onClose, variant, sessionKey, ...other } = props;

    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        if (sessionKey) {
            if (checkIfKeyExitsInSession(sessionKey)) {
                window.sessionStorage.removeItem(sessionKey)
            }
        }
        setOpen(false)
    }

    const checkIfKeyExitsInSession = (key) => {
        if (window.sessionStorage.getItem(key)) {
            return true
        }
        return false
    }

    if (sessionKey) {
        console.log(window.sessionStorage.getItem(sessionKey))
        if (!checkIfKeyExitsInSession(sessionKey)) {
            return (<></>)
        }
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" >
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
                {...other}
            />
        </Snackbar>
    )
}


export default CSessionEvents;
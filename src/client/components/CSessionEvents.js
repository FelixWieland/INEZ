import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SuccessIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';

const CSessionEvents = (props) => {
    const { className, message, onClose, variant, sessionKey, popen, noEvent, ...other } = props;

    const [open, setOpen] = React.useState(popen !== undefined ? popen : true);

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

    const getVariantIcon = (variantName) => {
        switch (variantName) {
            case 'SUCCESS': return <SuccessIcon />
            case 'ERROR': return <ErrorIcon />
            default: return <></>
        }
    }

    if (sessionKey && !noEvent) {
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
                        {getVariantIcon(variant)}
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
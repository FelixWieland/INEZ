import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const FormDialog = (props) => {
    const [state, setState] = React.useState({
        value: '',
        open: props.open,
    })

    const handleClose = () => {
        props.handleClose()
    }

    const onChange = (e) => {
        setState({
            open: state.open,
            value: e.target.value,
        })
    }

    const handleOk = () => {
        props.onOk(state.value)
        handleClose()
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby={'form-dialog-title'}>
                <DialogTitle id={'form-dialog-title'}>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.text}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin={'dense'}
                        id={'name'}
                        type={'email'}
                        value={state.value}
                        onChange={onChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={'primary'}>
                        {props.labels.close}
                    </Button>
                    <Button onClick={handleOk} color={'primary'}>
                        {props.labels.ok}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialog

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export default function SelectionPopup(props) {
    const classes = useStyles();
    const { handleClose, icon, open, list } = props;

    if (list.length === 0 && open)
        handleClose()

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
            <List>
                {list.map(item => (
                    <ListItem button key={item} onClick={() => props.onOk(item)}>
                        <ListItemAvatar >
                            <Avatar className={classes.avatar}>
                                {icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
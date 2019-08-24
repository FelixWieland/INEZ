import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    textField: {
        width: "100%",
    },
    addButton: {
        marginLeft: 10,
    }
}));

const overrideTextfield = makeStyles(theme => ({
    toolbar: {
        backgroundColor: "#FFFFFF"
    }
}))


const Navbar = (props) => {
    const classes = useStyles();
    const overrides = overrideTextfield();

    return (
        <AppBar position="static">
            <Toolbar variant="dense" classes={{ root: overrides.toolbar }}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {document.title}
                </Typography>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
            <Toolbar variant="dense">
                <TextField
                    classes={{ root: overrides.root }}
                    className={classes.textField}
                    placeholder="Ich brauche (z. B. 3L Milch)"
                />
                <Button className={classes.addButton} variant="outlined">
                    <AddIcon />
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
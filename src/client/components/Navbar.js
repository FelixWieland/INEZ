import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { TextField, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/styles'
import ReactAutosuggestTextfield from './ReactAutosuggestTextfield'
import { withRouter } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import SideProfile from './SideProfile'

const styles = (theme) => ({
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
        width: '100%',
    },
    addButton: {
        marginLeft: 10,
    },
    toolbar: {
        backgroundColor: '#FFFFFF',
    },
})

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullstring: '',
            textfieldValue: {},
            clearValue: () => undefined,
            anchorEl: null,
            sideProfileOpen: false,
        }
    }

    setValue = (value) => this.setState({ textfieldValue: value })

    setClearValue = (fn) => this.setState({ clearValue: fn })

    goBack = () => this.props.history.goBack();

    handleMenu = (event) => this.setState({ anchorEl: event.currentTarget });

    handleClick = (e) => {
        this.props.addGroceryItem(this.state.textfieldValue)
        this.state.clearValue()
    }

    toggleSideProfile = (event) => this.setState({
        sideProfileOpen: true,
        anchorEl: null,
    })

    render() {
        const { classes } = this.props

        return (
            <>
                <AppBar position={'static'}>
                    <Toolbar variant={'dense'} classes={{ root: classes.toolbar }}>
                        <IconButton
                            edge={'start'}
                            className={classes.menuButton}
                            onClick={this.goBack}
                            color={'inherit'}
                            aria-label={'menu'}>
                            {window.location.pathname === '/' ? <></> : <ArrowBack />}
                        </IconButton>
                        <Typography variant={'h6'} className={classes.title}>
                            {''}
                        </Typography>
                        <div>
                            <IconButton
                                aria-label={'account of current user'}
                                aria-controls={'menu-appbar'}
                                aria-haspopup={'true'}
                                color={'inherit'}
                                onClick={this.handleMenu}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id={'menu-appbar'}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.anchorEl)}
                                onClose={() => this.setState({ anchorEl: null })}
                            >
                                <MenuItem onClick={this.toggleSideProfile}>Profil</MenuItem>
                                <MenuItem>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                    <Toolbar variant={'dense'}>
                        {(this.props.disableAutosuggest === undefined || this.props.disableAutosuggest === false) && (
                            <>
                                <ReactAutosuggestTextfield
                                    setValue={this.setValue}
                                    setClearValue={this.setClearValue}
                                />
                                <Button className={classes.addButton} variant={'outlined'} onClick={this.handleClick}>
                                    <AddIcon />
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <SideProfile
                    open={this.state.sideProfileOpen}
                    onOpen={() => this.setState({ sideProfileOpen: true })}
                    onClose={() => this.setState({ sideProfileOpen: false })}
                />
            </>
        )
    }
}

export default withStyles(styles)(withRouter(Navbar))

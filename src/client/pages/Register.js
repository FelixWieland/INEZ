import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import * as api from './../api'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Register() {
    const classes = useStyles()
    const [state, setstate] = React.useState({
        username: '',
        password: '',
    })

    const text = {
        login: 'Du hast bereits einen Account? Melde dich an!',
        register: 'Registrieren',
        uname: 'Benutzername',
        pwd: 'Passwort',
        back: 'Zurück zur Startseite',
    }

    const register = () => {
        api.register(state.username, state.password, () => {
            // SUCCESS
            window.location = '/'
        }, (err) => {
            // ERRROR
            console.log(err)
        })
    }

    const handleChange = (field, value) => {
        setstate({
            ...state,
            [field]: value,
        })
    }

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component={'h1'} variant={'h5'}>
                    {text.register}
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete={'username'}
                                name={'username'}
                                variant={'outlined'}
                                required
                                fullWidth
                                id={'username'}
                                label={text.uname}
                                autoFocus
                                value={state.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant={'outlined'}
                                required
                                fullWidth
                                name={'password'}
                                label={text.pwd}
                                type={'password'}
                                id={'password'}
                                autoComplete={'current-password'}
                                value={state.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type={'submit'}
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        className={classes.submit}
                        onClick={register}
                    >
                        {text.register}
                    </Button>
                    <Grid container >
                        <Grid item >
                            <Link to={'/login'} className={'clearAll'}>
                                {text.login}
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to={'/homepage'} className={'clearAll'} >
                                {text.back}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
        </Container>
    )
}

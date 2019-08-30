import React from 'react'
import { Grid, Button, Fab, AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { VpnKey, AccountBox } from '@material-ui/icons'
import logo from '../../../public/images/inez_logo.png'
import banner from '../../../public/images/banner.jpg'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    upper: {
        backgroundColor: theme.palette.primary.main,
        height: '50vh',
        overflow: 'visible',
        backgroundImage: 'url("' + banner + '")',
        backgroundSize: 'cover',
        position: 'relative',
    },
    margin: {
        width: 200,
        margin: 10,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    img: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '50%',
    },
    appBar: {
        backgroundColor: '#FFFFFF',
    },
    logo: {
        height: 40,
    },
    headline: {
        fontSize: 40,
        fontWeight: 400,
        position: 'absolute',
        top: '100%',
        // transform: "translateY(-50%)",
        position: 'absolute',
        left: 50,
        width: '60%',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 30,
            width: '100%',
            left: 0,
        },
    },
    coloredSpan: {
        'color': theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    secondLogo: {
        height: 40,
    },
    grow: {
        flexGrow: 1,
    },
    rlArea: {
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'absolute',
        right: 20,
    },
    root: {
        marginTop: 56,
    },
}))

const Homepage = (props) => {
    const classes = useStyles()

    const login = () => {

    }

    const register = () => {

    }

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <img src={logo} className={classes.logo} />
                    <div className={classes.grow} />
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_Edeka.svg/1280px-Logo_Edeka.svg.png'} className={classes.secondLogo} />
                </Toolbar>
            </AppBar>
            <Grid container justify={'center'} className={classes.root}>
                <Grid item className={classes.upper} xs={12} sm={12}>
                    <div className={classes.rlArea}>
                        <Grid container justify={'center'}>
                            <Grid item >
                                <Link
                                    to={'/login'}
                                    className={'clearAll'}
                                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                                >
                                    <Fab
                                        variant={'extended'}
                                        aria-label={'add'}
                                        className={classes.margin}
                                        onClick={login}>
                                        <VpnKey className={classes.extendedIcon} />
                                        Login
                                </Fab>
                                </Link>
                            </Grid>
                            <Grid item xs={12} />
                            <Grid item >
                                <Link
                                    to={'/register'}
                                    className={'clearAll'}
                                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                                >
                                    <Fab
                                        variant={'extended'}
                                        aria-label={'add'}
                                        className={classes.margin}
                                        onClick={register}
                                    >
                                        <AccountBox className={classes.extendedIcon} />
                                        Registrieren
                                    </Fab>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                    <Typography className={classes.headline}>
                        Der INtelligente EinkaufsZettel by EDEKA DIGITAL
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>

                </Grid>
            </Grid>
        </>
    )
}

export default Homepage

import React from 'react';
import { Grid, Button, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { VpnKey, AccountBox } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    left: {
        backgroundColor: theme.palette.primary.main,
        height: "100vh"
    },
    rigth: {
        backgroundColor: "#FFFFFF",
        height: "100vh"
    },
    margin: {
        width: 200,
        margin: 10,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    inner: {
        marginTop: "calc(50vh - 60px)",
    },
    img: {
        position: "fixed",
        top: 0,
        right: 0,
        width: "50%"
    }
}))

const Homepage = (props) => {
    const classes = useStyles()

    const login = () => {

    }

    const register = () => {

    }

    return (
        <Grid container justify="center">
            <Grid item className={classes.left} xs={12} sm={6}>

            </Grid>
            <Grid item className={classes.right} xs={12} sm={6}>
                <img src="https://www.it-talents.de/thumbs/partner/edeka-digital-gmbh/original-500x173.jpg" className={classes.img} />
                <Grid container justify="center" className={classes.inner}>
                    <Grid item >
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} onClick={login}>
                            <VpnKey className={classes.extendedIcon} />
                            Login
                        </Fab>
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item >
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} onClick={register}>
                            <AccountBox className={classes.extendedIcon} />
                            Registrieren
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Homepage;
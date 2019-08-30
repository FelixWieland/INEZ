import React from 'react'
import { Fab } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        left: 25,
        bottom: 25,
    },
}))


const GroupDeleteFAB = (props) => {
    const classes = useStyles()

    return (
        <Fab color={'primary'} className={classes.root} {...props} >
            <Delete />
        </Fab>
    )
}

export default GroupDeleteFAB

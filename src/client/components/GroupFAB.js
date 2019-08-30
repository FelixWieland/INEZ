import React from 'react'
import { Fab } from '@material-ui/core'
import { AddCircleOutlined as Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: 25,
        bottom: 25,
    },
}))


const GroupFAB = (props) => {
    const classes = useStyles()

    return (
        <Fab color={'primary'} className={classes.root} {...props} >
            <Add />
        </Fab>
    )
}

export default GroupFAB

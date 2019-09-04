import React, { Component } from 'react'
import { withStyles, Grow } from '@material-ui/core'
import Navbar from '../components/Navbar'
import { Container } from '@material-ui/core'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import GroceryNote from '../components/GroceryNote'
import GroupFAB from '../components/GroupFAB'
import GroupDeleteFAB from '../components/GroupDeleteFab'
import DialogPopup from '../components/DialogPopup'
import SelectionPopup from '../components/SelectionPopup'
import { Delete } from '@material-ui/icons'
import { ddmmyyyy } from '../utility'
import SideProfile from '../components/SideProfile'
import * as api from './../api'

const styles = (theme) => ({
    card: {
        display: 'flex',
        margin: 15,
    },
    details: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 150,
        float: 'right',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
})

class Grocerys extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addGroceryNote: false,
            deleteGroceryNote: false,
            groceryNotes: [],
        }
    }

    componentDidMount() {
        api.getGroceryLists((result) => {
            this.setState({
                groceryNotes: result.grocerylists.reverse().map((elm) => {
                    return {
                        _id: elm._id,
                        label: elm.list_name,
                    }
                }),
            })
        }, (err) => {

        })
    }

    toggleAddGroceryNote = (e) => this.setState({ addGroceryNote: true })
    toggleDeleteGroceryNote = (e) => this.setState({ deleteGroceryNote: true })

    addGroceryNote = (name) => {
        api.createGroceryList(name, (jsonResponse) => {
            if (!jsonResponse) {
                return
            }
            const newNotes = this.state.groceryNotes
            newNotes.unshift({
                label: name,
            })
            this.setState({ groceryNotes: newNotes })
        }, (err) => {

        })
    }

    deleteGroceryNote = (groceryNoteObj) => {
        api.deleteGroceryList(groceryNoteObj.label, (jsonResponse) => {
            this.setState({
                groceryNotes: this.state.groceryNotes.filter((elm) => elm.label !== groceryNoteObj.label),
                deleteGroceryNote: false,
            })
        }, (err) => {

        })
    }


    renderAddGroceryNotePopup = (open) => {
        return (
            <DialogPopup
                open={open}
                title={'Einkaufszettel hinzufügen'}
                text={'Name des Zettels'}
                labels={{ ok: 'ok', close: 'close' }}
                onOk={this.addGroceryNote}
                handleClose={() => this.setState({ addGroceryNote: false })}
            />
        )
    }

    renderDeleteGroceryNotePopup = (open) => {
        return (
            <SelectionPopup
                open={open}
                title={'Einkaufszettel löschen'}
                icon={<Delete />}
                list={this.state.groceryNotes}
                onOk={this.deleteGroceryNote}
                handleClose={() => this.setState({ deleteGroceryNote: false })}
            />
        )
    }

    renderGroceryNotes = () => {
        const { classes } = this.props
        return (
            <>
                <Navbar addGroceryItem={this.addGroceryItem} disableAutosuggest />
                <Container maxWidth={'md'}>
                    {this.state.groceryNotes.map((elm) => {
                        return (
                            <Link
                                to={'/' + elm.label}
                                className={'clearAll'}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                <Card className={classes.card}>
                                    <div className={classes.details}>
                                        <CardContent className={classes.content}>
                                            <Typography component="h5" variant={'h5'}>
                                                {elm.label}
                                            </Typography>
                                            <Typography variant={'subtitle1'} color={'textSecondary'}>
                                                {''}
                                            </Typography>
                                        </CardContent>
                                        <div className={classes.controls}>

                                        </div>
                                    </div>
                                    <CardMedia
                                        className={classes.cover}
                                        image={'https://www.in-form.de/typo3temp/fl_realurl_image/lebensmittel-wertschaetzung-cd.jpeg'}
                                        title={'Live from space album cover'}
                                    />
                                </Card>
                            </Link>
                        )
                    })}
                </Container>
                {this.renderAddGroceryNotePopup(this.state.addGroceryNote)}
                {this.renderDeleteGroceryNotePopup(this.state.deleteGroceryNote)}
                <GroupDeleteFAB onClick={this.toggleDeleteGroceryNote} />
                <GroupFAB onClick={this.toggleAddGroceryNote} />
            </>
        )
    }

    render() {
        const { classes } = this.props
        return (
            <Switch>
                <Route path={'/'} exact component={() => this.renderGroceryNotes()} />
                <Route path={'/:id'} component={GroceryNote} />
            </Switch>
        )
    }
}

export default withStyles(styles)(Grocerys)

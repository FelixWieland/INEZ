import React, { Component } from 'react'
import { withStyles, Card, IconButton, Avatar, CardHeader, Collapse, CardContent, Typography, TextField, MenuItem, CircularProgress, Grid, Fab, Select, FormControl, InputLabel, Input } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    card: {
        marginTop: 10,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    amountcontainer: {
        marginBottom: 30,
        marginTop: -20,
        width: "100%",
        paddingBottom: 30,
    },
    amount: {
        float: "left"
    },
    amountMeasure: {
        float: "left"
    },
    amountInteraction: {
        float: "left"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        zIndex: 1000,
    },
    avatar: {
        overflow: "visible",
        '&:hover': {
            cursor: "pointer"
        }
    },
    greenAvatar: {
        overflow: "visible",
        backgroundColor: green[500],
        '&:hover': {
            cursor: "pointer"
        }
    },
    flat: {
        boxShadow: "none",
        marginTop: 25,
    },
    container: {
        marginTop: -40,
    },
    selectionField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
        marginTop: 16,
    }
});

class GroceryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: false,

            checked: false,
            amount: 0,
            measure: undefined,
            group: undefined,

            measureItems: [
                {
                    key: 1,
                    value: "gramm"
                },
                {
                    key: 2,
                    value: "kilo"
                }
            ],
        }
    }

    componentDidMount() {
        this.setState({
            checked: this.props.checked !== undefined ? this.props.checked : false,
            amount: this.props.amount !== undefined ? this.props.amount : 0,
            measure: this.props.measure !== undefined ? this.props.measure : "",
            group: this.props.group !== undefined ? this.props.group : "",
        })
    }

    toggleChecked = () => {
        this.setState({ loading: !this.state.checked })
        setTimeout(() => {
            this.setState({
                checked: !this.state.checked,
                loading: false,
            })
        }, 1000)
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    buildItems = (collection) => collection.map((elm) => (
        <MenuItem key={elm.key} value={elm.value}>
            {elm.value}
        </MenuItem>
    ))

    buildMeasureItems = () => {
        return this.buildItems(this.state.measureItems)
    }

    buildGroupItems = () => {
        return this.buildItems(this.props.currentGroups.map((elm, index) => ({ key: index, value: elm.label })))
    }

    handleMeasureChange = (e) => {
        this.setState({ measure: e.target.value })
    }

    handleAmountChange = (e) => {
        this.setState({ amount: e.target.value })
    }

    handleGroupChange = (e) => {
        this.props.onGroupChange({ id: this.props.id, name: this.props.name, amount: this.state.amount, measure: this.state.measure }, e.target.value)
        this.setState({ group: e.target.value })
    }

    buildAmountInteraction = () => {
        const { classes } = this.props;
        return (
            <Grid container justify="center" spacing={4} className={classes.container}>
                <Grid item xs={6} md={3}>
                    <TextField
                        label={"Menge"}
                        className={classes.textField}
                        value={this.state.amount !== 0 ? this.state.amount : ""}
                        onChange={this.handleAmountChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl className={classes.selectionField}>
                        <InputLabel shrink htmlFor="measure-label-placeholder">
                            Einheit
                        </InputLabel>
                        <Select
                            value={this.state.measure}
                            onChange={this.handleMeasureChange}
                            input={<Input name="measure" id="measure-label-placeholder" />}
                            displayEmpty
                            name="Einheit"
                            className={classes.selectEmpty}
                        >
                            {this.buildMeasureItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} md={4}>
                    <FormControl className={classes.selectionField}>
                        <InputLabel shrink htmlFor="group-label-placeholder">
                            Gruppe
                        </InputLabel>
                        <Select
                            value={this.state.group}
                            onChange={this.handleGroupChange}
                            input={<Input name="group" id="group-label-placeholder" />}
                            displayEmpty
                            name="Gruppe"
                            className={classes.selectEmpty}
                        >
                            {this.buildGroupItems()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} md={1} >
                    <Fab size="small" color="primary" aria-label="add" className={classes.flat} onClick={this.props.onDelete}>
                        <DeleteIcon />
                    </Fab>
                </Grid>
            </Grid >
        );
    }

    buildSubheader = () => {
        return (this.state.amount !== 0 ? this.state.amount : "") + " " + this.state.measure
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={this.state.checked ? classes.greenAvatar : classes.avatar} onClick={this.toggleChecked}>
                            {this.state.loading && <CircularProgress size={43} className={classes.fabProgress} />}
                            {this.state.checked ? <CheckIcon /> : "R"}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={this.toggleExpand}>
                            {this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    }
                    title={this.props.name}
                    subheader={this.buildSubheader()}
                />
                <Collapse in={this.state.expanded} timeout="auto">
                    <CardContent>
                        {this.buildAmountInteraction()}
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default withStyles(styles)(GroceryItem)
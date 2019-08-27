import React, { Component } from 'react'
import { withStyles, Card, IconButton, Avatar, CardHeader, Collapse, CardContent, Typography, TextField, MenuItem, CircularProgress, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

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
        padding: 5,
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
                    key: 1,
                    value: "kilo"
                }
            ],

            groupItems: [
                {
                    key: 1,
                    value: "Edeka"
                },
                {
                    key: 1,
                    value: "Lidl"
                }
            ]
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
        return this.buildItems(this.state.groupItems)
    }

    handleMeasureChange = (e) => {
        this.setState({ measure: e.target.value })
    }

    handleAmountChange = (e) => {
        this.setState({ amount: e.target.value })
    }

    handleGroupChange = (e) => {
        this.setState({ group: e.target.value })
    }

    buildAmountInteraction = () => {
        const { classes } = this.props;
        return (
            <Grid container justify="center">
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
                    <TextField
                        label={"Einheit"}
                        select
                        className={classes.textField}
                        value={this.state.measure}
                        onChange={this.handleMeasureChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {this.buildMeasureItems()}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        label={"Gruppe"}
                        select
                        className={classes.textField}
                        value={this.state.group}
                        onChange={this.handleGroupChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    >
                        {this.buildGroupItems()}
                    </TextField>
                </Grid>
            </Grid>
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
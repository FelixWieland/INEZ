import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import GroceryList from './GroceryList';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TimerSharp } from '@material-ui/icons';

const styles = theme => ({
    root: {
        marginTop: 15,
    }
});

function TabPanel(props) {
    const { children, value, index, hidden, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={hidden}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

class GroceryGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            groceryList: "",
            groups: [
                {
                    label: "Edeka"
                },
                {
                    label: "Lidl"
                },
                {
                    label: "Sonstiges"
                }
            ]
        }
    }

    toggleTab = (value) => {
        this.setState({ activeTab: value })
    }

    buildTabButtons = () => {
        return this.state.groups.map((elm, index) => {
            return (
                <Tab label={elm.label} {...a11yProps(index)} />
            )
        })
    }

    handleChange(event, newValue) {
        this.setState({ activeTab: newValue })
    }

    buildTabPanels = () => {
        return this.state.groups.map((elm, index) => {
            return (
                <TabPanel value={elm.label} index={index} hidden={this.state.activeTab != index}>
                    <GroceryList group={elm.label} groceryList={this.state.groceryList} />
                </TabPanel>
            );
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.activeTab}
                        onChange={(e, v) => this.handleChange(e, v)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {this.buildTabButtons()}
                    </Tabs>
                </AppBar>
                {this.buildTabPanels()}
            </div>
        )
    }
}

export default withStyles(styles)(GroceryGroups)
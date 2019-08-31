import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import GroceryList from './GroceryList'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Delete } from '@material-ui/icons'
import GroupFAB from './GroupFAB'
import DialogPopup from './DialogPopup'
import GroupDeleteFAB from './GroupDeleteFab'
import SelectionPopup from './SelectionPopup'
import * as api from './../api'

const styles = (theme) => ({
    root: {
        marginTop: 15,
    },
    tabbar: {
        marginTop: 25,
    },
})

const TabPanel = (props) => {
    const { children, value, index, hidden, ...other } = props

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
    )
}

const a11yProps = (index) => {
    return {
        'id': `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

class GroceryGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 0,
            groceryList: this.props.id,
            addGroup: false,
            deleteGroup: false,
            groups: [
                {
                    label: 'Edeka',
                },
                {
                    label: 'Lidl',
                },
                {
                    label: 'Sonstiges',
                },
            ],
        }
    }

    componentDidMount() {
        this.props.activeGroup(this.state.groups[this.state.activeTab].label)
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

    changeGroup = (obj, newgroup) => {
        this.state[newgroup + 'AddFn'](obj.id, obj.name, obj.amount, obj.measure, obj.productgroupid)
    }

    handleChange(event, newValue) {
        this.props.activeGroup(this.state.groups[newValue].label)
        this.setState({ activeTab: newValue })
    }

    buildTabPanels = () => {
        return this.state.groups.map((elm, index) => {
            return (
                <TabPanel value={elm.label} index={index} hidden={this.state.activeTab != index}>
                    <GroceryList
                        group={elm.label}
                        groceryList={this.state.groceryList}
                        onGroupChange={this.changeGroup}
                        currentGroups={this.state.groups}
                        exportAdd={(fn) => {
                            this.setState({ [elm.label + 'AddFn']: fn })
                            this.props.exportAdd(elm.label, fn)
                        }}
                    />
                </TabPanel>
            )
        })
    }

    renderAddGroupPopup = (open) => {
        return (
            <DialogPopup
                open={open}
                title={'Gruppe hinzufügen'}
                text={'Name der Gruppe'}
                labels={{ ok: 'ok', close: 'close' }}
                onOk={this.addGroup}
                handleClose={() => this.setState({ addGroup: false })}
            />
        )
    }

    renderDeleteGroupPopup = (open) => {
        return (
            <SelectionPopup
                open={open}
                title={'Gruppe löschen'}
                icon={<Delete />}
                list={this.state.groups}
                onOk={this.deleteGroup}
                handleClose={() => this.setState({ deleteGroup: false })}
            />
        )
    }


    addGroup = (groupname) => {
        api.createGroceryListGroup(this.props.id, groupname, (jsonResponse) => {
            if (!jsonResponse) {
                return
            }
            const newGroups = this.state.groups
            newGroups.push({ label: groupname })
            this.setState({ groups: newGroups, activeGroup: newGroups.length })
        }, (err) => { })
    }

    deleteGroup = (groupobj) => {
        api.deleteGroceryListGroup(this.props.listName, groupobj.label, (jsonResponse) => {
            if (!jsonResponse) {
                return
            }
            this.setState({ groups: this.state.groups.filter((elm) => elm.label !== groupobj.label) })
        }, (err) => { })
    }

    toggleAddGroupPopup = (e) => {
        this.setState({ addGroup: true })
    }

    toggleDeleteGroupPopup = (e) => {
        this.setState({ deleteGroup: true })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" className={classes.tabbar}>
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
                {this.renderAddGroupPopup(this.state.addGroup)}
                {this.renderDeleteGroupPopup(this.state.deleteGroup)}
                <GroupDeleteFAB onClick={this.toggleDeleteGroupPopup} />
                <GroupFAB onClick={this.toggleAddGroupPopup} />
            </div>
        )
    }
}

export default withStyles(styles)(GroceryGroups)

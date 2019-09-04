import React, { Component } from 'react'
import { withStyles, Badge } from '@material-ui/core'
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
    padding: {
        padding: theme.spacing(0, 2),
        zIndex: 0,
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
            groups: [],
        }
    }

    componentDidMount() {
        api.getGroceryListItems(this.state.groceryList, (result) => {
            console.log(result)
            this.setState({
                groups: result.productgroups.map((elm) => {
                    console.log(elm)
                    return {
                        label: elm.group,
                        products: elm.products,
                        amount: elm.products.length,
                    }
                }),
            })
            if (result.productgroups.length > 0) {
                this.props.activeGroup(result.productgroups[this.state.activeTab].group)
            }
        }, (err) => {

        })
    }


    toggleTab = (value) => {
        this.setState({ activeTab: value })
    }

    buildTabButtons = () => {
        return this.state.groups.map((elm, index) => {
            return (
                <Tab label={(
                    <Badge
                        className={this.props.classes.padding}
                        color={'primary'}
                        badgeContent={elm.products !== undefined ? elm.products.length : 0}>
                        {elm.label}
                    </Badge>
                )} {...a11yProps(index)} />
            )
        })
    }

    getItemsInGroup = (groupname, amountItems) => {
        this.setState({
            groups: this.state.groups.map((elm) => {
                if (elm.label !== groupname) {
                    return elm
                }
                elm.amount = amountItems
                return elm
            }),
        })
    }

    changeGroup = (obj, newGroup) => {
        this.state[newGroup + 'AddFn'](obj.id, obj.name, obj.amount, obj.measure, obj.productgroupid, obj.checked)
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
                        products={elm.products}
                        onGroupChange={this.changeGroup}
                        currentGroups={this.state.groups}
                        exportItemsInGroup={(amount) => this.getItemsInGroup(elm.label, amount)}
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
            this.setState({ groups: newGroups, activeGroup: newGroups.length, amount: 0 })
        }, (err) => { })
    }

    deleteGroup = (groupobj) => {
        api.deleteGroceryListGroup(this.state.groceryList, groupobj.label, (jsonResponse) => {
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

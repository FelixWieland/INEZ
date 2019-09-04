import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Draggable from 'react-draggable'
import GroceryItem from './GroceryItem'
import * as api from './../api'

const styles = (theme) => ({
    list: {
        marginTop: 10,
    },
    listItem: {
        borderRadius: 10,
        marginTop: 5,
    },
    groupItem: {
        marginTop: 20,
    },
    groupList: {
        padding: 20,
        paddingTop: 0,
    },
})

class GroceryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listItems: [],
        }
    }

    componentDidMount() {
        this.props.exportAdd(this.addItem)
        this.props.exportItemsInGroup(this.props.products.length)
        this.setState({ listItems: this.props.products !== undefined ? this.props.products : [] })
    }

    addItem = (id, name, amount, measure, productgroupid, checked) => {
        const newItems = this.state.listItems
        newItems.push({
            id: id,
            name: name,
            amount: amount,
            measure: measure,
            productgroupid: productgroupid,
            checked: checked,
        })
        this.setState({
            listItems: newItems,
        })
        this.props.exportItemsInGroup(newItems.length)
    }

    deleteItem = (name) => {
        api.deleteGroceryItem(this.props.groceryList, this.props.group, { product: name }, (result) => {
            this.setState({ listItems: this.state.listItems.filter((elm) => elm.name != name) })
        }, (err) => {

        })
    }

    deleteItemComponentOnly = (id) => {
        this.setState({ listItems: this.state.listItems.filter((elm) => elm.id != id) })
    }

    buildText = (text, amount, measure) => {
        return amount + ' ' + measure + ' ' + text
    }

    buildListItem = (icon, text) => {
        return (
            <ListItem button className={this.props.classes.listItem}>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText>
                    {text}
                </ListItemText>
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        onChange={undefined}
                        checked={true}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    toggleGroup = (name) => {
        if (this.state[name] != undefined) {
            this.setState({ [name]: !this.state[name] })
        } else {
            this.setState({ [name]: false })
        }
    }

    groupChange = (obj, newGroup) => {
        // api.updateGroceryItem()
        const currentGroup = this.props.group
        const listname = this.props.groceryList
        api.changeProductGroup(listname, currentGroup, newGroup, { product: obj.name }, (result) => {
            this.deleteItemComponentOnly(obj.id)
            this.props.onGroupChange(obj, newGroup)
        }, (err) => {

        })
    }

    buildGroceryItem = (id, name, amount, measure, productgroupid, checked) => {
        return (
            <GroceryItem
                key={name}
                id={id}
                onDelete={() => this.deleteItem(name)}
                onGroupChange={this.groupChange}
                name={name}
                amount={amount}
                measure={measure}
                group={this.props.group}
                currentGroups={this.props.currentGroups}
                productgroupid={productgroupid}
                checked={checked}
                listname={this.props.groceryList}
            />
        )
    }

    render() {
        const { classes } = this.props

        return (
            <List className={classes.list}>
                {this.state.listItems.map((elm) => {
                    return this.buildGroceryItem(
                        elm.id,
                        elm.name,
                        elm.amount,
                        elm.measure,
                        elm.productgroupid,
                        elm.checked
                    )
                })}
            </List>
        )
    }
}

export default withStyles(styles)(GroceryList)

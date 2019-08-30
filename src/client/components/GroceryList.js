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
            listItems: [
            ],
        }
    }

    componentDidMount() {
        this.props.exportAdd(this.addItem)
    }

    addItem = (id, name, amount, measure, productgroupid) => {
        const newItems = this.state.listItems
        newItems.push({
            id: id,
            name: name,
            amount: amount,
            measure: measure,
            productgroupid: productgroupid,
        })
        this.setState({
            listItems: newItems,
        })
    }

    deleteItem = (id) => {
        console.log(id)
        this.setState({ listItems: this.state.listItems.filter((elm) => elm.id != id) })
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

    groupChange = (obj, newgroup) => {
        // api.updateGroceryItem()

        this.deleteItemComponentOnly(obj.id)
        this.props.onGroupChange(obj, newgroup)
    }

    buildGroceryItem = (id, name, amount, measure, productgroupid) => {
        return (
            <GroceryItem
                key={id}
                id={id}
                onDelete={() => this.deleteItem(id)}
                onGroupChange={this.groupChange}
                name={name}
                amount={amount}
                measure={measure}
                group={this.props.group}
                currentGroups={this.props.currentGroups}
                productgroupid={productgroupid}
            />
        )
    }

    render() {
        const { classes } = this.props

        return (
            <List className={classes.list}>
                {this.state.listItems.map((elm) => {
                    return this.buildGroceryItem(elm.id, elm.name, elm.amount, elm.measure, elm.productgroupid)
                })}
            </List>
        )
    }
}

export default withStyles(styles)(GroceryList)

import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Draggable from 'react-draggable';
import GroceryItem from './GroceryItem';

const styles = theme => ({
    list: {
        marginTop: 10,
    },
    listItem: {
        //border: "1px solid black",
        borderRadius: 10,
        marginTop: 5,
    },
    groupItem: {
        marginTop: 20,
    },
    groupList: {
        padding: 20,
        paddingTop: 0,
    }
})

class GroceryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {
                    id: "01",
                    name: "Milch"
                },
                {
                    id: "02",
                    name: "Milch"
                }
            ]
        }
    }

    componentDidMount() {
        this.props.exportAdd(this.addItem)
    }

    addItem = (id, name, amount, measure) => {
        let newItems = this.state.listItems;
        newItems.push({
            id: id,
            name: name,
            amount: amount,
            measure: measure
        });
        this.setState({
            listItems: newItems
        })
    }

    deleteItem = (id) => {
        this.setState({ listItems: this.state.listItems.filter((elm) => elm.id != id) })
    }

    deleteItemComponentOnly = (id) => {
        this.setState({ listItems: this.state.listItems.filter((elm) => elm.id != id) })
    }

    buildText = (text, amount, measure) => {
        return amount + " " + measure + " " + text
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
        this.deleteItemComponentOnly(obj.id)
        this.props.onGroupChange(obj, newgroup)
    }

    buildGroceryItem = (id, name, amount, measure) => {
        return (
            <GroceryItem
                id={id}
                onDelete={() => this.deleteItem(id)}
                onGroupChange={this.groupChange}
                name={name}
                amount={amount}
                measure={measure}
                group={this.props.group}
                currentGroups={this.props.currentGroups} />
        );
    }

    render() {
        const { classes } = this.props
        return (
            <List className={classes.list}>
                {this.state.listItems.map((elm) => {
                    return this.buildGroceryItem(elm.id, elm.name, elm.amount, elm.measure)
                })}
            </List>
        )
    }

}

export default withStyles(styles)(GroceryList);
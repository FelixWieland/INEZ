import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, withStyles, Collapse } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Draggable from 'react-draggable';

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

        }
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

    buildGroup = (name, items) => {
        const open = this.state[name] != undefined ? this.state[name] : true;
        return (
            <>
                <ListItem button className={this.props.classes.groupItem} onClick={() => this.toggleGroup(name)}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText secondary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" className={this.props.classes.groupList}>
                        {items}
                    </List>
                </Collapse>
            </>
        )
    }

    render() {
        const { classes } = this.props
        return (
            <List className={classes.list}>
                {this.buildListItem(undefined, this.buildText("Milch", 1, "Liter"))}
                {this.buildGroup("DemoGroup", (
                    <>
                        {this.buildListItem(undefined, this.buildText("Milch", 1, "Liter"))}
                        {this.buildListItem(undefined, this.buildText("Milch", 1, "Liter"))}
                        {this.buildListItem(undefined, this.buildText("Milch", 1, "Liter"))}
                    </>
                ))}
            </List>
        )
    }

}

export default withStyles(styles)(GroceryList);
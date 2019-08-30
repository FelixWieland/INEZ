import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Navbar from '../components/Navbar'
import GroceryGroups from '../components/GroceryGroups'
import { Container } from '@material-ui/core'

class GroceryNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeGroup: '',
        }
    }

    addGroceryItem = (measureObj) => {
        this.state[this.state.activeGroup]
            .addGroceryItem('003', measureObj.product, measureObj.amount, measureObj.measure)
    }

    exportGroupAddFunction = (group, fn) => {
        this.setState({
            [group]: {
                addGroceryItem: fn,
            },
        })
    }

    setActiveGroup = (group) => {
        this.setState({ activeGroup: group })
    }

    render() {
        return (
            <>
                <Navbar addGroceryItem={this.addGroceryItem} />
                <Container maxWidth="md">
                    <GroceryGroups exportAdd={this.exportGroupAddFunction} activeGroup={this.setActiveGroup} id={this.props.match.id} />
                </Container>
            </>
        )
    }
}

export default GroceryNote


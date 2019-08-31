import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Navbar from '../components/Navbar'
import GroceryGroups from '../components/GroceryGroups'
import { Container } from '@material-ui/core'
import * as api from '../api'
import { withRouter } from 'react-router-dom'

class GroceryNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeGroup: '',
        }
    }

    addGroceryItem = (measureObj) => {
        api.createGroceryItem('list', measureObj, (jsonResponse) => {
            this.state[this.state.activeGroup]
                .addGroceryItem(
                    jsonResponse.id,
                    measureObj.product, measureObj.amount, measureObj.measure, measureObj.productgroupid)
        }, (err) => {

        })
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
                    <GroceryGroups
                        listName={''}
                        exportAdd={this.exportGroupAddFunction}
                        activeGroup={this.setActiveGroup}
                        id={this.props.match.params.id} />
                </Container>
            </>
        )
    }
}

export default withRouter(GroceryNote)


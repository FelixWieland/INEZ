import React, { Component } from 'react'
import { withStyles, SwipeableDrawer } from '@material-ui/core';

const styles = theme => ({

});

class SideProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SwipeableDrawer
                anchor="right"
                open={false}
                // open={this.props.open}
                onClose={this.props.onClose}
                onOpen={this.props.onOpen}
            >
                <div>
                    test
                </div>
            </SwipeableDrawer>
        )
    }
}

export default withStyles(styles)(SideProfile)
import React, { Component, useState } from 'react'
import { Button, MuiThemeProvider, Container } from '@material-ui/core';
import { theme } from './theme';
import { withStyles } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Grocerys from "./pages/Grocerys"
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';


const styles = theme => ({

});

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Switch>
						<Route path="/homepage" component={Homepage} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/" component={Grocerys} />
					</Switch>
				</BrowserRouter>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles)(App);
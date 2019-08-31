<<<<<<< HEAD
import React, { Component, useState } from "react";
import { Button, MuiThemeProvider, Container } from "@material-ui/core";
import { theme } from "./theme";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Grocerys from "./pages/Grocerys";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { hasSession } from "./session";
=======
import React, { Component, useState } from 'react'
import { Button, MuiThemeProvider, Container } from '@material-ui/core'
import { theme } from './theme'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Grocerys from './pages/Grocerys'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import { hasSession } from './session'
>>>>>>> 319b6bd8ef933d095ef0ed28ffacb2f766ec832c

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Switch>
						{hasSession() && <Route path={"/"} component={Grocerys} />}
						{!hasSession() && (
							<>
								<Route path={"/"} exact component={Homepage} />
								<Route path={"/login"} component={Login} />
								<Route path={"/register"} component={Register} />
							</>
						)}
					</Switch>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

export default App;

import React, { Component, useState } from "react";
import { Button, MuiThemeProvider, Container } from "@material-ui/core";
import { theme } from "./theme";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Grocerys from "./pages/Grocerys";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { hasSession } from "./session";
import CSessionEvents from "./components/CSessionEvents"

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<CSessionEvents message={"Willkommen zurück!"} sessionKey={"reLogin"} />
					<CSessionEvents message={"Vielen Dank fürs Registrieren!"} sessionKey={"register"} />
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

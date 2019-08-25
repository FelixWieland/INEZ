import React, { Component, useState } from 'react'
import { Button, MuiThemeProvider, Container } from '@material-ui/core';
import GroupFAB from './components/GroupFAB';
import { theme } from './theme';
import Navbar from './components/Navbar';
import GroceryList from './components/GroceryList';
import DownshiftTextfield from './components/DownshiftTexfield';
import Homepage from './components/Homepage';

const App = (props) => {
	const [state, setState] = useState({
		username: "",
	});

	if (state.username === "") {
		fetch('/api/getUsername')
			.then(res => res.json())
			.then(user => setState({
				username: user.username
			}));
	}


	//<p>Hello {state.username} <Button color="primary" variant="contained">Test</Button></p>
	return (
		<>
			<MuiThemeProvider theme={theme}>
				{/* <Homepage /> */}
				<Navbar />
				<Container maxWidth="md">
					<GroceryList />
				</Container>
				<GroupFAB />
			</MuiThemeProvider>
		</>
	);
}

/*

*/

export default App;
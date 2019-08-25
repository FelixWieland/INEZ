import React, { Component, useState } from 'react'

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


	return (
		<p>Hello {state.username}</p>
	);
}

export default App;
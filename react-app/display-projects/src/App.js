import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		let data = undefined;
		axios
			.get('http://localhost:9000/api/projects/')
			.then(response => (data = response.data.projects))
			.then(response => this.setState({ projects: data }))
			.then(response => console.log('didmount' + this.state.projects))
			.catch(err => console.log(err));
	}

	render() {
		return <div className="App"> {JSON.stringify(this.state)}</div>;
	}
}

export default App;

import React from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";

import Home from "./page/home";
import Login from "./page/login";
import Register from "./page/register";
import Dashboard from "./page/dashboard"

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/dashboard" component={Dashboard} />
			</HashRouter>
		);
	}
}

export default App;

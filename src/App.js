import React from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


import {
	CssBaseline
} from "@material-ui/core";

import {
	Home,
	SignIn,
	SignUp,
	Dashboard
  } from './page';
  

/*import Home from "./page/home/home";
import Login from "./page/signin/signin";
import Register from "./page/signup/signup";
import Dashboard from "./page/dashboard/dashboard"
*/
const browserHistory = createBrowserHistory();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1890FF",
		},
		secondary: {
			main: "#64b5f6",
		},
	},
});

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
			
			<HashRouter>
				<Route exact path="/" component={Home} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/dashboard" component={Dashboard} />
			</HashRouter>
			</ThemeProvider>
		);
	}
}

export default App;

//export default process.env.NODE_ENV === 'development' ? hot(App) : App;
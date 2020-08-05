import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Routes from "./Routes";

import { CssBaseline } from "@material-ui/core";

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
				<Routes />
			</ThemeProvider>
		);
	}
}

export default App;

//export default process.env.NODE_ENV === 'development' ? hot(App) : App;

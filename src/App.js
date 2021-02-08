import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Routes from "./Routes";
import {ViewSizeProvider} from "./helpers/viewContext";

// import {viewportContext} from "./components/UseViewPort/UseViewport.js"
//挂载 Mock
import './mock/data2.js'


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



// const ViewportProvider = ({ children }) => {
//   const [width, setWidth] = React.useState(window.innerWidth);
//   const [height, setHeight] = React.useState(window.innerHeight);
//   const handleWindowResize = () => {
//     setWidth(window.innerWidth);
//     setHeight(window.innerHeight);
//   };

//   React.useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);
//     return () => window.removeEventListener("resize", handleWindowResize);
//   }, []);

//   return (
//     <viewportContext.Provider value={{ width, height }}>
//       {children}
//     </viewportContext.Provider>
//   );
// };


class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
					<ViewSizeProvider>
						<Routes />
					</ViewSizeProvider>
			</ThemeProvider>
		);
	}
}

export default App;

//export default process.env.NODE_ENV === 'development' ? hot(App) : App;

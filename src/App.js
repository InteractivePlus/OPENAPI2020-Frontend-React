import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Routes from "./Routes";
import {ViewSizeProvider} from "./helpers/viewContext";

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


function App(props) {


	React.useEffect(() => {
		let callBackUrl = '';
		let appId = '';
		console.log(window.location.href)
		try {
			const query = window.location.href.split('?')[1];// '?callback=www.baidu.com&appid=1'
			const arr = query.split('&'); // ['callback=...', 'appid=...']
			callBackUrl = arr[0].split('=')[1]; //获取回调url
			appId = arr[1].split('=')[1]; //获取appid
		}
		catch (e) {
			//先判断一下哪个参数有错
			if (callBackUrl === '') {
				console.log('无回调url')
			}
			if (appId === '') {
				console.log('无appid')
			}
			//无参或者有错误跳转到控制面板
		}

	}, []); //带一个空参数，这样的useEffect相当于componentDidMount


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ViewSizeProvider>
				<Routes />
			</ViewSizeProvider>
		</ThemeProvider>
	);

}

export default App;

//export default process.env.NODE_ENV === 'development' ? hot(App) : App;

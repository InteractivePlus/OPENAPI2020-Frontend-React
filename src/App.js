import React from "react";
import axios from 'axios'
import Routes from "./Routes";
import {ViewSizeProvider,getUrlParameter} from "./utils";
import {isEmpty} from "./utils/commonutils";
import { ErrCode, ApiUrl, URLPARAMETER } from "./config/config.js";


import { Provider } from 'react-redux';



import { store } from './store/configureStore';

import { message } from 'antd';

import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//挂载 Mock
// import './mock/data2.js'


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

	// 加载时就判断url参数
	React.useEffect(() => {
		let callBackUrl = '';
		let appId = '';
		
		
		//获取第三方授权参数
		callBackUrl = getUrlParameter(URLPARAMETER.CALLBACK);
		appId = getUrlParameter(URLPARAMETER.APPID);
		
		if (!isEmpty(callBackUrl) && !isEmpty(appId)) {
			//处理第三方授权
			return;
		}

		//判断一下哪个参数不行，方便调试
		if (isEmpty(callBackUrl)) {
			console.log('无回调url')
		}
		else {
			console.log('回调url:',callBackUrl)
		}
		if (isEmpty(appId)) {
			console.log('无appid')
		}
		//无参或者有错误跳转到控制面板

	}, []); //带一个空参数，这样的useEffect相当于componentDidMount


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<ViewSizeProvider>
					<Routes />
				</ViewSizeProvider>
			</Provider>
		</ThemeProvider>
	);

}



export default App;

//export default process.env.NODE_ENV === 'development' ? hot(App) : App;

import React from "react";
import axios from 'axios'
import Routes from "./Routes";
import {ViewSizeProvider} from "./helpers/viewContext";
import {getUrlParameter} from "./helpers/getUrlParameter";
import {isEmpty} from "./helpers/utils";
import { Setting, ErrCode, ApiUrl, URLPARAMETER } from "./config/config.js";


import { Provider } from 'react-redux';

import { fromJS } from 'immutable';



import {configureStore, store} from './store/configureStore';

import { message } from 'antd';

import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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

	// const store = configureStore();

	// 加载时就判断url参数
	React.useEffect(() => {
		let callBackUrl = '';
		let appId = '';
		let vericode = '';

		vericode = getUrlParameter(URLPARAMETER.VERIFY);
		// console.log(veriCode);
		if (!isEmpty(vericode)) {
			console.log("注册验证码：", vericode);
			
			//验证邮箱
			let handleVerifyEmail = async (event) => {
				await axios.get(ApiUrl.verifyEmailApi +'/' + vericode, {
				})
					.then((response) => {
						console.log(response.data);
						if (response.data.errorCode === ErrCode.NO_ERROR) {
							message.success('邮箱验证成功');
							console.log('邮箱验证成功');
							window.location.href = '/#/verify';
						}
					})
					.catch((error) => {
						message.error('邮箱验证失败');
						console.log('邮箱验证失败');
						console.log(error);
						window.location.href='/'
					})
					.then(() => {
					});
			};
			handleVerifyEmail();

			return;
		}
		else
			console.log('无注册验证');
		
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

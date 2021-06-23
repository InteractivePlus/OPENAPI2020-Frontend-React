import React from "react";
import axios from 'axios'
import SwipeableViews from "react-swipeable-views";
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  LinearProgress, Collapse, Tabs, Tab } from "@material-ui/core";
import { FlexCard, TabPanel, XsydCardContainer, CodeInput } from "../../components";

import {useViewSize} from "../../helpers/viewContext";
import { Setting, ErrCode, ApiUrl, CAPTCHASTATE, SIGNINPAGE } from "../../config/config.js";

import { message } from 'antd';


import {
	getCaptcha,
    verifyCaptcha,
    submitSignUp,
	authStart,
	setUser,
	showLoading,
	hideLoading,

	setInPage,
	setSignUpForm
  } from '../../actions';
  


// eslint-disable-next-line
import "../../static/css/logcommon.css";

function Login(props) {
	//从props中引入状态和方法
	const { page, captchaId, captchaImgBase64, captchaValidState } = props;
	const { onTurnToPage, onGetCaptcha, onVerifyCaptcha, onInputChange, onSignUp } = props;

	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	//控制页面切换
	//let [page, setPage] = React.useState(1);
	//控制进度条显示
	let [isLoading, setLoading] = React.useState(false);
	//当前会话验证id
	//let [captchaId, setCaptchaId] = React.useState('0');

	let [tabs, setTabs] = React.useState(0);


	let handleNextPage = (event) => {
		// 验证表单

		// setLoading(true);
		// setTimeout(() => {
		// 	setLoading(false);
		// 	//setPage(2);
		// }, 1000);
	};


	let handlePreviousPage = (event) => {
		//setPage(1);
	};

	// let hadnleDoSignIn = async () => {
	// 	//验证码判定标志
	// 	let flagCaptcha = false;
	// 	//第一步注册通过标志
	// 	let flagFirstSignUp = false;

	// 	//登录
	// 	await axios.post(ApiUrl.userSignInApi, {
	// 		// username: form.username.value,
	// 		password: form.password2.value,
	// 		email: form.email.value,
	// 		captcha_id: captchaId
	// 	})
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			if (response.data.errorCode === ErrCode.NO_ERROR) {
					
	// 				console.log('登录成功')
	// 				flagCaptcha = true;

	// 			}
	// 		})
	// 		.catch((error) => {
	// 			message.error('登录失败')
	// 			console.log(error);
	// 		})
	// 		.then(() => {
	// 			//无论有没有成功都在执行完成后打印id看看
	// 			console.log(captchaId)
	// 		});

	// 	//如果没有通过验证，那么刷新重来
	// 	if (flagCaptcha === false) {
	// 		handleGetCaptcha();
	// 		return;
	// 	}

	// 	return flagFirstSignUp;
	// };

	let handleChangeTab = (event, newValue) => {
		setTabs(newValue);
	};

	let handleChangeIndex = (index) => {
		setTabs(index);
	};

	let handleEnterDashboard = (event) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			props.history.push("/dashboard");
		}, 1000);
	};

	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
        //跳转到填写信息页
        onTurnToPage(SIGNINPAGE.INFO_FORM);
        //获取验证码
		onGetCaptcha();
	}, []);


	return (
		<>
			<div className="progress-placeholder">
				<Collapse in={isLoading}>
					<LinearProgress />
				</Collapse>
			</div>
			<Container maxWidth={isMobile ? false : "xs"} className={isMobile ? "" : "container"}>
				<FlexCard size={isMobile ? "small" : "large"}>
					<Collapse in={page === 1}>
						<CardContent className={page === 1 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="登录" subtitle="一个账号，畅享BlueAirLive所有服务">
								<Tabs value={tabs} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
									<Tab label="密码登录" />
									<Tab label="短信验证码登录" />
								</Tabs>
								<div className="space-justify-view">
									{/*这里是这个组件原本就有第一次动画无法播放的bug，参考https://github.com/oliviertassinari/react-swipeable-views/issues/599 */}
									<SwipeableViews index={tabs} onChangeIndex={handleChangeIndex} containerStyle={{transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'}}>
										<TabPanel value={tabs} index={0}>
											<TextField className="input" label="邮箱或手机号码" />
											<TextField className="input" type="password" label="密码" />
										</TabPanel>
										<TabPanel value={tabs} index={1}>
											<TextField className="input" label="手机号码" />
											<TextField className="input" label="验证码" />
										</TabPanel>
									</SwipeableViews>
								</div>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={6} className="options-left">
										<Link href="/#/signup">注册账号</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === 2}>
						<CardContent className={page === 2 ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="登录验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								此处暂无
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6} className="options-left">
										<Link href="/#/signin" onClick={handlePreviousPage}>
											返回
										</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleEnterDashboard} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
				</FlexCard>
			</Container>
		</>
	);
}

export default Login;

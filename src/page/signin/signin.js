import React from "react";
import axios from 'axios'
import SwipeableViews from "react-swipeable-views";
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	LinearProgress, Collapse, Tabs, Tab
} from "@material-ui/core";

import {
	FlexCard, TabPanel, XsydCardContainer,
	CodeInput, CardBottomBar
} from "../../components";

import {useViewSize} from "../../helpers/viewContext";
import { Setting, ErrCode, ApiUrl, CAPTCHASTATE, SIGNINPAGE } from "../../config/config.js";

import { message } from 'antd';

import { connect } from 'react-redux';



import {
	getCaptcha,
    verifyCaptcha,
    submitSignIn,
	authStart,
	setUser,
	setSignInPage
  } from '../../actions';
  


// eslint-disable-next-line
import "../../static/css/logcommon.css";
import "../../static/css/login.css";

const Login=(props)=> {
	//从props中引入状态和方法
	const { page, captchaId, captchaImgBase64, captchaValidState } = props;
	const { onTurnToSignInPage, onGetCaptcha, onVerifyCaptcha, onInputChange, onSignIn } = props;

	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	//控制页面切换
	//let [page, setPage] = React.useState(1);
	//控制进度条显示
	let [isLoading, setLoading] = React.useState(false);
	//当前会话验证id
	//let [captchaId, setCaptchaId] = React.useState('0');

	let [tabs, setTabs] = React.useState(0);


	//用一个集合表示表单数据
	let [form, setForm] = React.useState({
		username: {
			invalid: false,
			value: '',
			error: ''
		},
		//密码
		//password1只有value有用，其他状态看password2
		password1: {
			invalid: false,
			value: '',
			error: ''
		},
		password2: {
			invalid: false,
			value: '',
			error: ''
		},
		email: {
			valid: false,
			value: '',
			error: ''
		},
		phone: {
			invalid: false,
			value: '',
			error: ''
		},
		captchaInput: {
			invalid: false,
			value: '',
			error: ''
		}
    });

	let handleNextPage = (event) => {
		// 验证表单

		// setLoading(true);
		// setTimeout(() => {
		// 	setLoading(false);
		// 	//setPage(2);
		// }, 1000);
	};


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
	
	// 输入框获取焦点事件，这里只用来清除错误提示，为了美观
	let handleInputFocus = async (event) => {
		const value = event.target.value;
		const field = event.target.name;
		const newFieldObj = { value, invalid: false, error: '' };
		// 重置指定文本框状态
		setForm({
			...form,
			[field]: newFieldObj
		});
	};
	
	//输入框改变事件
	let handleInputChange = (event) => {
		// String.prototype.trim.call(target.value);用于过滤
		const value = event.target.value;
		const field = event.target.name;
		const newFieldObj = { value, invalid: false, error: '' };
		// 重置指定文本框状态
		setForm({
			...form,
			[field]: newFieldObj
		});
	};


	//初步检查信息合法性
    let handleCheckBasicInfo = () => {
		return true;
	};
	
	//开始登录
    let hadnleDoSignIn = async () => {
		//开始登录
		// console.log(form.username.value);
		console.log(form.email.value);
		console.log(form.password2.value);
		console.log(form.captchaInput.value);
		
        onSignIn(form.username.value, form.email.value, form.password2.value, captchaId);
	};

	let handleGoSignUp = (event) => {
		props.history.push("/signup");
	};

	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
        //跳转到填写信息页
        onTurnToSignInPage(SIGNINPAGE.INFO_FORM);
        //获取验证码
		onGetCaptcha();
	}, []);

	
	//监听form.captchaInput的改变，当长度=配置中验证码长度触发验证
	React.useEffect(() => {
		if (form.captchaInput.value.length === 5) {
			onVerifyCaptcha(captchaId, form.captchaInput.value);
			console.log('验证码输入完成，触发验证',form.captchaInput.value);
		}
	}, [form.captchaInput]);

	return (
		<>
			<div className="progress-placeholder">
				<Collapse in={isLoading}>
					<LinearProgress />
				</Collapse>
			</div>
			<Container maxWidth={isMobile ? false : "xs"} className={isMobile ? "" : "container"}>
				<FlexCard size={isMobile ? "small" : "large"}>
					<Collapse in={page === SIGNINPAGE.EMPTY_PAGE}></Collapse>
					<Collapse in={page === SIGNINPAGE.INFO_FORM}>
						<CardContent className={page === SIGNINPAGE.INFO_FORM ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="登录" subtitle="一个账号，畅享BlueAirLive所有服务">
								<Tabs value={tabs} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
									<Tab label="密码登录" />
									<Tab label="短信验证码登录" />
								</Tabs>
								<div className="space-justify-view">
									{/*这里是这个组件原本就有第一次动画无法播放的bug，参考https://github.com/oliviertassinari/react-swipeable-views/issues/599 */}
									<SwipeableViews index={tabs} onChangeIndex={handleChangeIndex} containerStyle={{transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'}}>
										<TabPanel value={tabs} index={0}>
											<TextField name="email" className="input" label="邮箱或手机号码" onFocus={handleInputFocus} onChange={handleInputChange} />
											<TextField name="password2" className="input" type="password" label="密码" onFocus={handleInputFocus} onChange={handleInputChange} />
										</TabPanel>
										<TabPanel value={tabs} index={1}>
											<TextField className="input" label="手机号码" />
											<TextField className="input" label="验证码" />
										</TabPanel>
									</SwipeableViews>
								</div>
								<CardBottomBar
									leftText='注册账号'
									leftTextClickHandler={handleGoSignUp}
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        if(handleCheckBasicInfo())
                                            onTurnToSignInPage(SIGNINPAGE.INFO_FORM + 1)
                                    }}
									buttonState={true}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === SIGNINPAGE.CAPTCHA}>
						<CardContent className={page === SIGNINPAGE.CAPTCHA ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="登录验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									
									<div style={{ display: 'block' }}>
										<img style={{ verticalAlign: "middle" }} className="captcha-img" src={captchaImgBase64} alt="captcha img" />
									</div>
									{/*指定数字属性 validator={(input, index) => {return /\d/.test(input); }} */}
									<CodeInput type="text" length={5} onChange={userInput => {
										handleInputChange({
                                            target: {
                                                name: 'captchaInput',
												value: userInput
										}});
									}} />
								</div>
								<CardBottomBar
									leftText='返回'
									leftTextClickHandler={()=>{onTurnToSignInPage(SIGNINPAGE.INFO_FORM)}}
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        hadnleDoSignIn();
                                    }}
									buttonState={captchaValidState===CAPTCHASTATE.OK}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === SIGNINPAGE.COMPLETE}>
						<CardContent className={page === SIGNINPAGE.COMPLETE ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="登录成功" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									即将自动跳转到原网站或形随意动首页。
								</div>
								<Grid container justify="center" alignItems="center">
									<Button variant="contained" color="primary" disableElevation>
										返回
									</Button>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
				</FlexCard>
			</Container>
		</>
	);
}

export default connect(
	(state) => ({
		page: state.getIn(['userSignIn', 'page']),
		// form: state.getIn(['userSignUp', 'form']),
		captchaId: state.getIn(['user', 'captchaId']),
		captchaImgBase64: state.getIn(['user', 'captchaImgBase64']),
		captchaValidState: state.getIn(['user', 'captchaValidState'])
	}),
	(dispatch) => ({
		//转到指定页
		onTurnToSignInPage: (pageIndex) => {
			dispatch(setSignInPage({ key: 'page', value: pageIndex }));
		},
		//获取验证码
		onGetCaptcha: () => {
			dispatch(getCaptcha(dispatch));
		},
		//验证验证码
		onVerifyCaptcha: (captchaId, captchaInputValue) => {
			console.log('触发验证事件')
			console.log(captchaId, captchaInputValue)
			dispatch(verifyCaptcha(dispatch, captchaId, captchaInputValue));
        },
        //开始正式注册
        onSignIn: (username, email, password, captchaId) => {
            dispatch(submitSignIn(dispatch, username, email, password, captchaId));
        },
		//输入改变
		// onInputChange: (event) => {
		// 	const newvalue = event.target.value;
		// 	const field = event.target.name;
		// 	//更新状态
		// 	// setSignUpForm({ key: field, value: newvalue });
		// },
		
	}),
)(Login);

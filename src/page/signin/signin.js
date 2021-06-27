/* @file OPENAPI登录页面
* @version v1.0
*/
import React from "react";
// import SwipeableViews from "react-swipeable-views";
import { Container, CardContent, TextField, 
	Button, Grid, 
	Collapse, Tabs, Tab,
	CircularProgress
} from "@material-ui/core";

import {
	FlexCard, TabPanel, XsydCardContainer,
	CodeInput, CardBottomBar
} from "../../components";

import {useViewSize} from "../../utils";
import { Setting, CAPTCHASTATE, SIGNINPAGE } from "../../config/config.js";


import { connect } from 'react-redux';

import {isEmpty} from "../../utils";


import {
	getCaptcha,
	clearCaptcha,
    verifyCaptcha,
    submitSignIn,
	authStart,
	setUser,
	setSignInPage
  } from '../../actions';
  


// eslint-disable-next-line
import "../../static/css/logcommon.css";

const Login=(props)=> {
	//从props中引入状态和方法
	const {
		page,
		captchaId,
		captchaImgBase64,
		captchaValidState,
		isCaptchaGotten,
		isCaptchaInputEnabled
	} = props;
	const {
		onTurnToPage,
		onVerifyCaptcha,
		onSignIn,
		onClearCaptcha
	} = props;

	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	//tab切换
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

	let handleChangeTab = (event, newValue) => {
		setTabs(newValue);
	};

	let handleChangeIndex = (index) => {
		setTabs(index);
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
		onTurnToPage(SIGNINPAGE.EMPTY_PAGE);
		props.history.push("/signup");
		// window.location.href = "/#/signup";
	};

	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
        //跳转到填写信息页
		onTurnToPage(SIGNINPAGE.INFO_FORM);
		//清除验证码
		onClearCaptcha();
	}, []);

	
	//监听form.captchaInput的改变，当长度=配置中验证码长度触发验证
	React.useEffect(() => {
		if (form.captchaInput.value.length === 5) {
			onVerifyCaptcha(captchaId, form.captchaInput.value);
			console.log('验证码输入完成，触发验证',form.captchaInput.value);
		}
	}, [form.captchaInput]);

	//监听captchaValidState的改变
	React.useEffect(() => {
		//加一个page判断，防止另一个流程验证通过后切换过来触发动作
		if (captchaValidState === CAPTCHASTATE.OK && page === SIGNINPAGE.CAPTCHA) {
			hadnleDoSignIn();
		}
	}, [captchaValidState]);

	return (
		<>
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
									{/*这里是这个组件原本就有第一次动画无法播放的bug，参考https://github.com/oliviertassinari/react-swipeable-views/issues/599 *
									containerStyle={{transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'}}*/}
									{/* 因为该组件需要手动调整高度，暂时没有好办法，所以先取消了 */}
									{/* <SwipeableViews index={tabs} onChangeIndex={handleChangeIndex} > */}
										<TabPanel value={tabs} index={0}>
											<TextField name="email" className="MyMuiInput" size="small" variant="outlined" label="邮箱或手机号码" onFocus={handleInputFocus} onChange={handleInputChange} />
											<TextField name="password2" className="MyMuiInput" size="small" variant="outlined" type="password" label="密码" onFocus={handleInputFocus} onChange={handleInputChange} />
										</TabPanel>
										<TabPanel value={tabs} index={1}>
											<TextField className="MyMuiInput" size="small" variant="outlined" label="手机号码" />
											<TextField className="MyMuiInput" size="small" variant="outlined" label="验证码" />
										</TabPanel>
									{/* </SwipeableViews> */}
								</div>
								<CardBottomBar
									leftText='注册账号'
									leftTextClickHandler={handleGoSignUp}
									centerText='忘记密码？'
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        if(handleCheckBasicInfo())
                                            onTurnToPage(SIGNINPAGE.INFO_FORM + 1)
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
									<div className="captcha-container">
									{
										!isCaptchaGotten ?
											<div className="captcha-progress">
												<CircularProgress />
											</div>
											:
											<img style={{ verticalAlign: "middle" }} className="captcha-img" src={captchaImgBase64} alt="captcha img" />
									}
									</div>
									{/*指定数字属性 validator={(input, index) => {return /\d/.test(input); }} */}
									<CodeInput
										enable={page === SIGNINPAGE.CAPTCHA && isCaptchaInputEnabled}
										type="text"
										length={5}
										onChange={userInput => {
											handleInputChange({
												target: {
													name: 'captchaInput',
													value: userInput
											}});
										}}
									/>
								</div>
								<CardBottomBar
									leftText='返回'
									leftTextClickHandler={()=>{onTurnToPage(SIGNINPAGE.INFO_FORM)}}
									buttonText=''
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
		isCaptchaInputEnabled: state.getIn(['user', 'isCaptchaInputEnabled']),
		// form: state.getIn(['userSignUp', 'form']),
		captchaId: state.getIn(['user', 'captchaId']),
		captchaImgBase64: state.getIn(['user', 'captchaImgBase64']),
		isCaptchaGotten: state.getIn(['user', 'isCaptchaGotten']),
		captchaValidState: state.getIn(['user', 'captchaValidState'])
	}),
	(dispatch) => ({
		//转到指定页
		onTurnToPage: (pageIndex) => {
			//如果是跳转到验证码页要刷新一下
			if (pageIndex === SIGNINPAGE.CAPTCHA){
				dispatch(getCaptcha(dispatch));
			}
			dispatch(setSignInPage({ key: 'page', value: pageIndex }));
		},
		//获取验证码
		onGetCaptcha: () => {
			dispatch(getCaptcha(dispatch));
		},
		//清除验证码
		onClearCaptcha: () => {
			dispatch(clearCaptcha(dispatch));
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
        }
	}),
)(Login);

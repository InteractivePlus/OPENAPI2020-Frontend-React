/*
* @file OPENAPI忘记密码页面
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

import { useViewSize, getUrlParameter, isEmpty} from "../../utils";
import { Setting, CAPTCHASTATE, RESETPWDPAGE, URLPARAMETER } from "../../config/config.js";

import { connect } from 'react-redux';


import {
	getCaptcha,
	clearCaptcha,
    verifyCaptcha,
	getResetPwdVCode,
	submitResetPwd,
	
	authStart,
	setUser,
	setResetPwdPage
  } from '../../actions';
  


// eslint-disable-next-line
import "../../static/css/logcommon.css";

const ResetPwdPage=(props)=> {
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
		onClearCaptcha,
		onGetResetPwdVCode,
		onResetPwd,
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
    let hadnleDoResetPwdGetVCode = async () => {
		//开始登录
		// console.log(form.username.value);
		console.log(form.email.value);
		console.log(form.password2.value);
		console.log(form.captchaInput.value);
		
        onGetResetPwdVCode(form.username.value, form.email.value, form.password2.value, captchaId);
	};

	let handleGoSignIn = (event) => {
		onTurnToPage(RESETPWDPAGE.EMPTY_PAGE);
		props.history.push("/signin");
		// window.location.href = "/#/signup";
	};

	let handleSubmitResetPwd = async () => {
		onResetPwd(getUrlParameter(URLPARAMETER.VERIFY), form.password2.value);
	}

	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
		//清除验证码
		onClearCaptcha();

		//判断验证码
		let vericode = getUrlParameter(URLPARAMETER.VERIFY);
		if (!isEmpty(vericode)) {
			console.log("注册验证码：", vericode);
			onTurnToPage(RESETPWDPAGE.NEW_PWD);
		}
		else {
			console.log('无注册验证');
			
			//跳转到填写信息页
			onTurnToPage(RESETPWDPAGE.INFO_FORM);
		}
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
		if (captchaValidState === CAPTCHASTATE.OK && page === RESETPWDPAGE.CAPTCHA) {
			hadnleDoResetPwdGetVCode();
		}
	}, [captchaValidState]);

	return (
		<>
			<Container maxWidth={isMobile ? false : "xs"} className={isMobile ? "" : "container"}>
				<FlexCard size={isMobile ? "small" : "large"}>
					<Collapse in={page === RESETPWDPAGE.EMPTY_PAGE}></Collapse>
					<Collapse in={page === RESETPWDPAGE.INFO_FORM}>
						<CardContent className={page === RESETPWDPAGE.INFO_FORM ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="重设您的密码" subtitle="一个账号，畅享BlueAirLive所有服务">
								<TextField name="email" size="small" variant="outlined" error={form.email.invalid} spellCheck="false" className="MyMuiInput" label="电子邮箱" onFocus={handleInputFocus} onChange={handleInputChange} />
								
								<CardBottomBar
									leftText='登录账号'
									leftTextClickHandler={handleGoSignIn}
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        if(handleCheckBasicInfo())
                                            onTurnToPage(RESETPWDPAGE.INFO_FORM + 1)
                                    }}
									buttonState={true}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === RESETPWDPAGE.CAPTCHA}>
						<CardContent className={page === RESETPWDPAGE.CAPTCHA ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="重设您的密码" subtitle="一个账号，畅享BlueAirLive所有服务">
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
										enable={page === RESETPWDPAGE.CAPTCHA && isCaptchaInputEnabled}
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
									leftTextClickHandler={()=>{onTurnToPage(RESETPWDPAGE.INFO_FORM)}}
									buttonText=''
                                    buttonClickHandler={() => {
                                        hadnleDoResetPwdGetVCode();
                                    }}
									buttonState={captchaValidState===CAPTCHASTATE.OK}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === RESETPWDPAGE.COMPLETE_SENDVCODE}>
						<CardContent className={page === RESETPWDPAGE.COMPLETE_SENDVCODE ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="重设您的密码" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									验证邮件已发送，完成验证后继续下一步。
								</div>
								<Grid container justify="center" alignItems="center">
									<Button variant="contained" color="primary" onClick={handleGoSignIn} disableElevation>
										登录
									</Button>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === RESETPWDPAGE.NEW_PWD}>
						<CardContent className={page === RESETPWDPAGE.NEW_PWD ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="重设您的密码" subtitle="一个账号，畅享BlueAirLive所有服务">
								<TextField name="password2" size="small" variant="outlined" error={form.email.invalid} spellCheck="false" className="MyMuiInput" label="新密码" onFocus={handleInputFocus} onChange={handleInputChange} />
								
								<CardBottomBar
									buttonText='下一步'
                                    buttonClickHandler={handleSubmitResetPwd}
									buttonState={true}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === RESETPWDPAGE.COMPLETE_RESET}>
						<CardContent className={page === RESETPWDPAGE.COMPLETE_RESET ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="重设您的密码" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									密码重设成功
								</div>
								<Grid container justify="center" alignItems="center">
									<Button variant="contained" color="primary" onClick={handleGoSignIn} disableElevation>
										登录
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
		page: state.getIn(['userResetPwd', 'page']),
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
			if (pageIndex === RESETPWDPAGE.CAPTCHA){
				dispatch(getCaptcha(dispatch));
			}
			dispatch(setResetPwdPage({ key: 'page', value: pageIndex }));
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
        //获取重设密码的验证码
        onGetResetPwdVCode: (username, email, password, captchaId) => {
            dispatch(getResetPwdVCode(dispatch, username, email, password, captchaId));
		},
		//开始重设密码
		onResetPwd: (vericode, newPassword) => {
			dispatch(submitResetPwd(dispatch, vericode, newPassword));
        }
	}),
)(ResetPwdPage);

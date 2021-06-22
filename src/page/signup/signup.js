/**
 * @file OPENAPI注册页面
 * @version v1.0
 * 当开发者需要编辑其他页面时，请以该页面为参考模板
 * 如果该页面有任何问题，请联系开发团队讨论交流，我们将第一时间解决
 */
import React from "react";
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  Collapse } from "@material-ui/core";
import { FlexCard, XsydCardContainer,CodeInput,CardBottomBar } from "../../components";
import {useViewSize} from "../../helpers/viewContext";
import { Setting, ErrCode, ApiUrl, CAPTCHASTATE, SIGNUPPAGE } from "../../config/config.js";

import { connect } from 'react-redux';

import { store } from '../../store/configureStore';

import {
	getCaptcha,
    verifyCaptcha,
    submitSignUp,
	authStart,
	setUser,
	setSignUpPage
  } from '../../actions';
  

//普通按需加载，会有样式污染
//但真的比materialui的消息框好看
//那个太难看了而且使用、自定义还烦，和审美、正常的编程逻辑严重不符
import { message } from 'antd';

import "../../static/css/logcommon.css";
import "../../static/css/register.css";



//指定按需加载，可避免样式污染，但是会没有动画
//import message from 'antd/lib/message'
//import 'antd/lib/message/style/index.css'

//注意useState有异步问题，await无效，所以通过直接赋值（仅在函数内作用）来缓解
const Register = (props) => {
	//从props中引入状态和方法
	const { page, captchaId, captchaImgBase64, captchaValidState } = props;
	const { onTurnToPage, onGetCaptcha, onVerifyCaptcha, onInputChange, onSignUp } = props;
    
	//是否同意用户协议
	let [protocol, setProtocol] = React.useState(false);
	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	
	//两个密码框是否有过失去焦点，借此判断是否触发输入规则检验
	let [isFirstPwdBlur, setFirstPwdBlur] = React.useState(false);
	let [isSecondPwdBlur, setSecondPwdBlur] = React.useState(false);

    
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
    
    
	//MaterialUI的textfield很神奇，先用ref代替吧
	//防止usestate异步问题，直接用ref拿value
	let passwordInput1Ref = React.createRef();
	let passwordInput2Ref = React.createRef();

	//hook版forceupdate实现
	//使用：forceUpdate();
	const [,updateState]=React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	
	//同意协议，就直接处理了
	let handleProtocolChange = (event) => {
		setProtocol(event.target.checked);
    };
    
    // 获取MUI输入区域的值，dom出奇迹，输入参数是ref
    let getValueFromMUIField = (target) => {
		return target.current.childNodes[1].childNodes[0].value
	}

	// 输入框失去焦点事件
	let handleInputBlur = async (event) => {
		const value = event.target.value;
		let field = event.target.name;
		// 定义常量
		const newFieldObj = { value, invalid: false, error: '' };
		// 判断
		switch (field) {
			case 'username': {
				if (value.length === 0) {
					newFieldObj.error = '请输入用户名';
					newFieldObj.invalid = true;
				}
				break;
			}
			case 'email': {
				if (value.length === 0) {
					newFieldObj.error = '请输入邮箱';
					newFieldObj.invalid = true;
				}
				break;
			}
			//因为两个密码框最后共享一个判断逻辑，就没break，那个'password'case只是标记，不会前两个都跳过就进入的
			case 'password1': {
				if (field === 'password1') {
					//注意useState有异步问题，await无效，所以通过直接赋值（仅在函数内作用）来缓解
					isFirstPwdBlur = true;
					setFirstPwdBlur(true);
				}
			}
			case 'password2': {
				if (field === 'password2') {
					isSecondPwdBlur = true;
					setSecondPwdBlur(true);
				}
			}
			case 'password': {
				forceUpdate();
				//先判断用户是否点过了两个文本框，再进行规则检查
				if (isFirstPwdBlur === true && isSecondPwdBlur === true) {
					//文本框规则
					if ((value.length === 0
						|| getValueFromMUIField(passwordInput1Ref) !== getValueFromMUIField(passwordInput2Ref))) {
						field = 'password2';
						newFieldObj.error = '请检查密码';
						newFieldObj.invalid = true;
					}
				}
				break;
			}
			default: {
				//
			}
		}

		// 设置状态
		setForm({
			...form,
			[field]: newFieldObj
		});
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
        // 判断两次密码是否一样+输入框是否空白
        if (form.password2.value !== '' && form.password1.value === form.password2.value) {
            //没有问题，可以翻页了
            return true;
        } else {
            message.error('请检查信息是否正确')
        }
        return false;
    };
	
    //开始注册
    let hadnleDoSignUp = async () => {
		//开始注册
		console.log(form.username.value);
		console.log(form.email.value);
		console.log(form.password2.value);
		console.log(form.captchaInput.value);
		
        onSignUp(form.username.value, form.email.value, form.password2.value, captchaId);
	};
    

	let handleGoLogin = (event) => {
		props.history.push("/signin");
	};

    

	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
        //跳转到填写信息页
		//这里有一个问题，就是进断点之后会连续触发setsignuppage和setsigninpage
		//导致注册页面和登录页面的开头动画无法播放（通过page状态切换，从emptypage到infoform）
		//该问题有待解决
        onTurnToPage(SIGNUPPAGE.INFO_FORM);
        //获取验证码
		onGetCaptcha();
		// 相当于componentWillMount
		return () => {
			onTurnToPage(SIGNUPPAGE.EMPTY_PAGE);
        }
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
			<Container maxWidth={isMobile ? false : "xs"} className={isMobile ? "" : "container"}>
				<FlexCard size={isMobile ? "small" : "large"}>
					<Collapse in={page === SIGNUPPAGE.EMPTY_PAGE}></Collapse>
					<Collapse in={page === SIGNUPPAGE.INFO_FORM}>
						<CardContent className={page === SIGNUPPAGE.INFO_FORM ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="注册您的形随意动账号" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div>
									{/*注意要取消拼写检查*/}
									<TextField name="username" error={form.username.invalid} spellCheck="false" className="input" label="用户名" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<TextField name="email" error={form.email.invalid} spellCheck="false" className="input" label="电子邮箱" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<p className="email-tip-text">稍后您需要验证此邮箱</p>
									<TextField name="password1" error={form.password2.invalid} ref={passwordInput1Ref} className="input" type="password" label="密码" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<TextField name="password2" error={form.password2.invalid} ref={passwordInput2Ref} className="input" type="password" label="确认密码"  onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<p className="password-tip-text">
										使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（必须包含字母和数字）
									</p>
								</div>
								<FormControlLabel
									control={
										<Checkbox checked={protocol} size="small" onChange={handleProtocolChange} name="protocol" color="primary" />
									}
									label={
										<div style={{ fontSize: "0.8em" }}>
											我已阅读并同意<Link href="#">《用户协议》</Link>
										</div>
									}
								/>
								<CardBottomBar
									leftText='登录账号'
									leftTextClickHandler={handleGoLogin}
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        if(handleCheckBasicInfo())
                                            onTurnToPage(SIGNUPPAGE.INFO_FORM + 1)
                                    }}
									buttonState={protocol}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === SIGNUPPAGE.CAPTCHA}>
						<CardContent className={page === SIGNUPPAGE.CAPTCHA ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
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
									leftTextClickHandler={()=>{onTurnToPage(SIGNUPPAGE.INFO_FORM)}}
									buttonText='下一步'
                                    buttonClickHandler={() => {
                                        hadnleDoSignUp();
                                    }}
									buttonState={captchaValidState===CAPTCHASTATE.OK}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === SIGNUPPAGE.MORE_INFO}>
						<CardContent className={page === SIGNUPPAGE.MORE_INFO ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
								{/* <div className="space-justify-view">
									<TextField className="input" label="手机号" />
								</div> */}
								<CardBottomBar
									leftText='返回'
									leftTextClickHandler={()=>{onTurnToPage(SIGNUPPAGE.INFO_FORM)}}
									buttonText='下一步'
									buttonClickHandler={()=>{onTurnToPage(SIGNUPPAGE.MORE_INFO + 1)}}
									buttonState={true}
								/>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === SIGNUPPAGE.COMPLETE}>
						<CardContent className={page === SIGNUPPAGE.COMPLETE ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="完成注册" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">恭喜您，注册完成。</div>
								<div className="space-justify-view">
									验证邮件已发送，完成验证后账户方可用。
								</div>
								<Grid container justify="center" alignItems="center">
									<Button variant="contained" color="primary" onClick={handleGoLogin} disableElevation>
										去登陆
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
		page: state.getIn(['userSignUp', 'page']),
		// form: state.getIn(['userSignUp', 'form']),
		captchaId: state.getIn(['user', 'captchaId']),
		captchaImgBase64: state.getIn(['user', 'captchaImgBase64']),
		captchaValidState: state.getIn(['user', 'captchaValidState'])
	}),
	(dispatch) => ({
		//转到指定页
		onTurnToPage: (pageIndex) => {
			//如果是跳转到验证码页要刷新一下
			if (pageIndex === SIGNUPPAGE.CAPTCHA){
				dispatch(getCaptcha(dispatch));
			}
			//跳转到指定页
			dispatch(setSignUpPage({ key: 'page', value: pageIndex }));
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
        onSignUp: (username, email, password, captchaId) => {
            dispatch(submitSignUp(dispatch, username, email, password, captchaId));
        },
		//输入改变
		// onInputChange: (event) => {
		// 	const newvalue = event.target.value;
		// 	const field = event.target.name;
		// 	//更新状态
		// 	// setSignUpForm({ key: field, value: newvalue });
		// },
		
	}),
)(Register);



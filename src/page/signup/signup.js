import React from "react";
import axios from 'axios'
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  LinearProgress, Collapse,Snackbar } from "@material-ui/core";
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { FlexCard, XsydCardContainer,CodeInput } from "../../components";

import {useViewSize} from "../../helpers/viewContext";

import { Setting, ErrCode, apiUrl } from "../../config/config.js";
import "../../static/css/logcommon.css";
import "../../static/css/register.css";


function Register(props) {
	//注意useState有异步问题，await无效，所以通过直接赋值（仅在函数内作用）来缓解

	//是否同意用户协议
	let [protocol, setProtocol] = React.useState(false);
	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	//控制页面切换
	let [page, setPage] = React.useState(1);
	//控制进度条显示
	let [isLoading, setLoading] = React.useState(false);
	//当前会话验证id
	let [captchaId, setCaptchaId] = React.useState('0');
	//图片验证码base64
	let [captchaImgBase64, setCaptchaImgBase64] = React.useState('0');
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

	const pageMaxCount = 4; //增加新collapse时记得调整最大页数
	//MaterialUI的textfield很神奇，先用ref代替吧
	//防止usestate异步问题，直接用ref拿value
	let passwordInput1Ref = React.createRef();
	let passwordInput2Ref = React.createRef();


	let getValueFromMUIField = (target) => {
		// dom出奇迹
		return target.current.childNodes[1].childNodes[0].value
	}

	let handleProtocolChange = (event) => {
		setProtocol(event.target.checked);
	};

	let handleNextPage = async (index) => {
		// 传入的其实是page，表明是第几页上的下一步按钮
		let flagTurnNext = false;//是否跳转下一页
		// 开始加载动画
		setLoading(true);

		// 根据第几页执行特定逻辑
		switch (index) {
			case 1: {
				// 判断两次密码是否一样+输入框是否空白
				if (form.password2.value !== '' && form.password1.value === form.password2.value) {
					//准备下一页的验证码
					await handleGetCaptcha();
					//没有问题，可以翻页了
					flagTurnNext = true;
				}
				break;
			}
			case 2: {
				let result = await hadnleDoSignUp();
				if (result === true) {
					//初步注册完成，可以翻页
					flagTurnNext = true;
				}
				break;
			}
			case 3: {
				flagTurnNext = true;
				break;
			}
			default: { }
		}

		// 结束加载动画
		setLoading(false);
		//可以翻页+在范围内就翻页
		if (flagTurnNext && page < pageMaxCount) {
			setPage(page + 1);
		}
	};

	let hadnleDoSignUp = async () => {
		//验证码判定标志
		let flagCaptcha = false;
		//第一步注册通过标志
		let flagFirstSignUp = false;

		//验证码判断
		await axios.get(apiUrl.captchaApi + captchaId + '/submitResult', {
			params: {
				phrase: form.captchaInput.value
			}
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('验证通过')
					flagCaptcha = true;

				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(captchaId)
			});

		//如果没有通过验证，那么刷新重来
		if (flagCaptcha === false) {
			handleGetCaptcha();
			return;
		}

		//开始注册
		console.log(form.username.value);
		console.log(form.email.value);
		console.log(form.password2.value);
		console.log(form.captchaInput.value);
		//发送请求
		await axios.post(apiUrl.userApi, {
			username: form.username.value,
			password: form.password2.value,
			email: form.email.value,
			captcha_id: captchaId
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('初步注册完成，需继续进行验证');
					flagFirstSignUp=true;
				}
			})
			.catch((error) => {
				// console.log(error);
				console.log(error.response);
				if (error.response.data.errorCode === ErrCode.ITEM_ALREADY_EXIST_ERROR) {
					console.log('用户已存在')
				}
				else if (error.response.data.errorCode === '') {
					//我赌老秋风这里没写验证
					console.log('密码不规范')
				}
				else if (error.response.data.errorCode === ErrCode.SENDER_SERVICE_ERROR) {
					console.log('邮箱验证发送失败，请检查邮箱是否正确')
				}
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(captchaId)
			});
		return flagFirstSignUp;
	};

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
		//更新状态
		setForm({
			...form,
			[field.value]: value
		});
	};

	//获得验证id和验证码图片base64
	let handleGetCaptcha = async (event) => {
		await axios.get(apiUrl.captchaApi, {
			width: 150,
			height: 40
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('获取到验证码')
					captchaId = response.data.data.captcha_id;
					setCaptchaId(response.data.data.captcha_id);
					setCaptchaImgBase64('data:image/jpeg;base64,' + response.data.data.captcha_data.jpegBase64);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(captchaId)
			});

	};

	let handlePreviousPage = (event) => {
		setPage(1);
	};

	let handleGoLogin = (event) => {
		props.history.push("/signin");
	};

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
						<CardContent className={page === 1 ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="注册您的形随意动账号" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div>
									{/*注意要取消拼写检查*/}
									<TextField name="username" error={form.username.invalid} spellCheck="false" className="input" label="用户名" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<TextField name="email" error={form.email.invalid} spellCheck="false" className="input" label="电子邮箱" onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} />
									<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>
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
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signin">登录账号</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={ handleNextPage.bind(this, page) } disabled={!protocol} disableElevation>
											下一步
									</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === 2}>
						<CardContent className={page === 2 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									
									<div style={{ display: 'block' }}>
										<img style={{ verticalAlign: "middle" }} className="captcha-img" src={captchaImgBase64} alt="captcha img" />
									</div>
									{/*指定数字属性 validator={(input, index) => {return /\d/.test(input); }} */}
									<CodeInput type="text" length={5} onChange={userInput => { 
										// console.log(userInput);
										setForm({
											...form,
											captchaInput: { value: userInput, invalid: false, error: '' }
										});
									}} />
								</div>
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signup" onClick={handlePreviousPage}>
											返回
									</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleNextPage.bind(this, page)} disableElevation>
											下一步
									</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === 3}>
						<CardContent className={page === 3 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									<TextField className="input" label="手机号" />
									<TextField className="input" label="国家/地区" />
									<TextField className="input" label="语言选择" />
								</div>
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signup" onClick={handlePreviousPage}>
											返回
									</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleNextPage.bind(this, page)} disableElevation>
											下一步
									</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
					<Collapse in={page === 4}>
						<CardContent className={page === 4 ? "validation-card" : "validation-card-none"}>
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

export default Register;

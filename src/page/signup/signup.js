import React from "react";
import axios from 'axios'
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  LinearProgress, Collapse,Snackbar } from "@material-ui/core";
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { FlexCard, XsydCardContainer,CodeInput } from "../../components";
import { Setting, ErrCode } from "../../config/config.js";
import "../../static/css/logcommon.css";
import "../../static/css/register.css";

// import {viewportContext,useViewport} from "../../components/UseViewPort/UseViewport.js"


class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			//是否同意用户协议
			protocol: false,
			clientWidth: 0,
			page: 1,
			isLoading: false,
			captchaId: '',
			//captchaFlag: false,
			//图片验证码base64
			captchaImgBase64: '',
			//两个密码框是否有过失去焦点，借此判断是否触发输入规则检验
			isFirstPwdBlur: false,
			isSecondpwdBlur: false,
			//第一步注册完成标志
			isFirstStepSignUpOk: false,

			//用一个集合表示表单数据
			form: {
				username: {
					invalid: false,
					value: '',
					error: ''
				},
				password: {
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
				},

			}
		};
		this.pageMaxCount = 4; //增加新collapse时记得调整最大页数
		//MaterialUI的textfield很神奇，先用ref代替吧
		this.userNameInputRef = React.createRef();
		this.emailInputRef = React.createRef();
		this.passwordInput1Ref = React.createRef();
		this.passwordInput2Ref = React.createRef();
		//this.captchaInputRef = React.createRef();
	}

	getInputFromMUIField = (target) => {
		// dom出奇迹
		return target.current.childNodes[1].childNodes[0].value
	}

	handleResize = () => {
		this.setState({ clientWidth: document.body.clientWidth });
	};

	handleProtocolChange = (event) => {
		this.setState({ protocol: event.target.checked });
	};


	handleNextPage = async (index) => {
		// 传入的其实是page，表明是第几页上的下一步按钮
		// 开始加载动画
		let flagTurnNext = false;//是否跳转下一页
		this.setState({ isLoading: true });
		//表单状态引用
		const { form } = this.state;
		// 根据第几页执行特定逻辑
		if (index === 1) {
			//先把输入框的值更新到状态
			await this.setState({
				form: {
					...form,
					username: { value: this.getInputFromMUIField(this.userNameInputRef), invalid: false, error: '' },
					email: { value: this.getInputFromMUIField(this.emailInputRef), invalid: false, error: '' },
					password: { value: this.getInputFromMUIField(this.passwordInput2Ref), invalid: false, error: '' },
				}
			});

			// 判断两次密码是否一样+输入框是否空白
			if (this.state.form.password.value !== '') {
				//设置textfield的error状态
				// this.setState({ 
				// 	form: {
				// 		...form,
				// 		: false
				// 	});
				//准备下一页的验证码
				await this.handleGetCaptcha();
				//没有问题，可以翻页了
				flagTurnNext = true;
			}
			else {
				//不一致就停在这一页
				flagTurnNext = false;
			}
		}
		else if (index === 2) {
			await this.hadnleDoSignUp();
			if(this.state.isFirstStepSignUpOk===true){
				//初步注册完成，可以翻页
				flagTurnNext = true;
			}
		}
		else if (index===3){
			flagTurnNext = true;
		}
		else if (index===4){

		}
		// 结束加载动画
		this.setState({ isLoading: false });
		if (flagTurnNext && this.state.page < this.pageMaxCount) {
			this.setState({ page: this.state.page + 1 });
		}
	};

	hadnleDoSignUp = async (event) => {
		//http://pdk.xsyds.cn:8899/
		//验证码判定标志
		let flagCaptcha = false;

		//根据textfield引用更新state，必须同步，或者在回调函数里写
		const { form } = this.state;
		await this.setState({
			form: {
				...form,
				username: { value: this.getInputFromMUIField(this.userNameInputRef), invalid: false, error: '' },
				email: { value: this.getInputFromMUIField(this.emailInputRef), invalid: false, error: '' },
				password: { value: this.getInputFromMUIField(this.passwordInput2Ref), invalid: false, error: '' },
				//captchaInput: { value: this.getInputFromMUIField(this.captchaInputRef), invalid: false, error: '' }
			}
		});

		//验证码判断
		await axios.get('http://81.71.84.198:8899/captcha/' + this.state.captchaId + '/submitResult	', {
			params: {
				phrase: this.state.form.captchaInput.value
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
				console.log(this.state.captchaId)
			});

		//如果没有通过验证，那么刷新重来
		if (flagCaptcha === false) {
			this.handleGetCaptcha();
			return;
		}

		//开始注册
		console.log(this.state.form.username.value);
		console.log(this.state.form.email.value);
		console.log(this.state.form.password.value);
		console.log(this.state.form.captchaInput.value);
		await axios.post('http://81.71.84.198:8899/user', {
			username: this.state.form.username.value,
			password: this.state.form.password.value,
			email: this.state.form.email.value,
			captcha_id: this.state.captchaId
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('初步注册完成，需继续进行验证')
					this.setState({ isFirstStepSignUpOk:true });
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
				console.log(this.state.captchaId)
			});
	}

	// 输入框失去焦点事件
	handleInputBlur = async (field, value, type = 'string') => {
		// 可以根据传入type为number来手动转换value的类型为number类型
		if (type === 'number') {
			//js是弱类型，通过加号运算转成数字类型
			value = + value;
		}
		// 定义常量
		const { form } = this.state;
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
					//console.log('p1')
					await this.setState({ isFirstPwdBlur: true });
				}
			}
			case 'password2': {
				if (field === 'password2') {
					//console.log('p2')
					await this.setState({ isSecondpwdBlur: true });
				}
			}
			case 'password': {
				//先判断用户是否点过了两个文本框，再进行规则检查
				if (this.state.isFirstPwdBlur === true && this.state.isSecondpwdBlur === true) {
					//文本框规则
					if ((value.length === 0
						|| this.getInputFromMUIField(this.passwordInput1Ref) !== this.getInputFromMUIField(this.passwordInput2Ref))) {
						field = 'password';
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
		this.setState({
			form: {
				...form,
				[field]: newFieldObj
			}
		});
	}

	// 输入框获取焦点事件，这里只用来清除错误提示，为了美观
	handleInputFocus = async (field, value) => {
		// 定义常量
		const { form } = this.state;
		const newFieldObj = { value, invalid: false, error: '' };
		// 重置指定文本框状态
		await this.setState({
			form: {
				...form,
				[field]: newFieldObj
			}
		});
	}


	handleGetCaptcha = async (event) => {
		await axios.get('http://81.71.84.198:8899/captcha', {
			width: 150,
			height: 40
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('获取到验证码')

					this.setState({
						captchaId: response.data.data.captcha_id,
						captchaImgBase64: 'data:image/jpeg;base64,' + response.data.data.captcha_data.jpegBase64
					});
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(this.state.captchaId)
			});

	}

	handlePreviousPage = (event) => {
		this.setState({ page: 1 });

	};

	handleGoLogin = (event) => {
		this.props.history.push("/signin");
	};

	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		//手动触发
		window.dispatchEvent(new Event("resize"))
	}


	render() {
		return (
			<>
				<div className="progress-placeholder">
					<Collapse in={this.state.isLoading}>
						<LinearProgress />
					</Collapse>
				</div>

				<Container maxWidth={this.state.clientWidth <= 600 ? false : "xs"} className={this.state.clientWidth <= 600 ? "" : "container"}>
					<FlexCard size={this.state.clientWidth <= 600 ? "small" : "large"}>
						<Collapse in={this.state.page === 1}>
							<CardContent className={this.state.page === 1 ? "register-card" : "register-card-none"}>
								<XsydCardContainer title="注册您的形随意动账号" subtitle="一个账号，畅享BlueAirLive所有服务">
									<div>
										{/*注意要取消拼写检查*/}
										<TextField error={this.state.form.username.invalid} ref={this.userNameInputRef} spellCheck="false" className="input" label="用户名" onFocus={(e) => this.handleInputFocus('username', e.target.value)} onBlur={(e) => this.handleInputBlur('username', e.target.value)}/>
										<TextField error={this.state.form.email.invalid} ref={this.emailInputRef} spellCheck="false" className="input" label="电子邮箱" onFocus={(e) => this.handleInputFocus('email', e.target.value)} onBlur={(e) => this.handleInputBlur('email', e.target.value)} />
										<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>

										<TextField error={this.state.form.password.invalid} ref={this.passwordInput1Ref} className="input" type="password" label="密码" onFocus={(e) => this.handleInputFocus('password', e.target.value)} onBlur={(e) => this.handleInputBlur('password1', e.target.value)}/>
										<TextField error={this.state.form.password.invalid} ref={this.passwordInput2Ref} className="input" type="password" label="确认密码"  onFocus={(e) => this.handleInputFocus('password', e.target.value)} onBlur={(e) => this.handleInputBlur('password2', e.target.value)}/>
										<p className="password-tip-text">
											使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（必须包含字母和数字）
										</p>
									</div>

									<FormControlLabel
										control={
											<Checkbox checked={this.state.protocol} size="small" onChange={this.handleProtocolChange} name="protocol" color="primary" />
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
											<Button variant="contained" color="primary" onClick={ this.handleNextPage.bind(this, this.state.page) } disabled={!this.state.protocol} disableElevation>
												下一步
										</Button>
										</Grid>
									</Grid>
								</XsydCardContainer>
							</CardContent>
						</Collapse>

						<Collapse in={this.state.page === 2}>
							<CardContent className={this.state.page === 2 ? "validation-card" : "validation-card-none"}>
								<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
									<div className="space-justify-view">
										
										<div style={{ display: 'block' }}>
											<img style={{ verticalAlign: "middle" }} className="captcha-img" src={this.state.captchaImgBase64} alt="captcha img" />
										</div>
										{/*<TextField ref={this.captchaInputRef} className="input" label="验证码（区分大小写）" />*/}
										{/*onChange={value => this.handleChange('username', value)}*/}
										{/*指定数字属性 validator={(input, index) => {return /\d/.test(input); }} */}
										<CodeInput type="text" length={5} onChange={userInput => { 
											console.log(userInput);
											const {form} = this.state;
											this.setState({
												form: {
													...form,
													captchaInput: { value: userInput, invalid: false, error: '' }
												}
											});
										}} />

									</div>

									<Grid container justify="center" alignItems="center">
										<Grid item xs={6}>
											<Link href="/#/signup" onClick={this.handlePreviousPage}>
												返回
										</Link>
										</Grid>
										<Grid item xs={6} className="options-right">
											<Button variant="contained" color="primary" onClick={this.handleNextPage.bind(this, this.state.page)} disableElevation>
												下一步
										</Button>
										</Grid>
									</Grid>
								</XsydCardContainer>
							</CardContent>
						</Collapse>

						<Collapse in={this.state.page === 3}>
							<CardContent className={this.state.page === 3 ? "validation-card" : "validation-card-none"}>
								<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
									<div className="space-justify-view">
										<TextField className="input" label="手机号" />
										<TextField className="input" label="国家/地区" />
										<TextField className="input" label="语言选择" />
									</div>

									<Grid container justify="center" alignItems="center">
										<Grid item xs={6}>
											<Link href="/#/signup" onClick={this.handlePreviousPage}>
												返回
										</Link>
										</Grid>
										<Grid item xs={6} className="options-right">
											<Button variant="contained" color="primary" onClick={this.handleNextPage.bind(this, this.state.page)} disableElevation>
												下一步
										</Button>
										</Grid>
									</Grid>
								</XsydCardContainer>
							</CardContent>
						</Collapse>

						<Collapse in={this.state.page === 4}>
							<CardContent className={this.state.page === 4 ? "validation-card" : "validation-card-none"}>
								<XsydCardContainer title="完成注册" subtitle="一个账号，畅享BlueAirLive所有服务">
									<div className="space-justify-view">恭喜您，注册完成。</div>
									<div className="space-justify-view">
										验证邮件已发送，完成验证后账户方可用。
									</div>
									<Grid container justify="center" alignItems="center">
										<Button variant="contained" color="primary" onClick={this.handleGoLogin} disableElevation>
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
}

export default Register;

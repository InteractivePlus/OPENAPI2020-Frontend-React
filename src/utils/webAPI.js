/**
 * @file WebAPI接口库
 * @version v1.0
 */
import axios from 'axios'
import {
    Setting,
    ErrCode,
    ApiUrl,
    URLPARAMETER,
    CAPTCHASTATE,
    SIGNUPPAGE,
    SIGNINPAGE,
	VERIFYPAGE,
	RESETPWDPAGE
} from "../config/config.js";


import { isEmpty, isUrl, isHttpUrl, getUrlParameter } from "../utils";
import {
    showLoading,
    hideLoading,
	setSignUpPage,
	setVerifyPage,
	setResetPwdPage,
    authComplete,
    authError,
    completeLogout,
    setUser,
    getCaptcha,
} from '../actions';

import { message, Modal } from 'antd';

const { confirm } = Modal;

/**
 * 网络请求配置
 */
axios.defaults.timeout = 100000;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
	(config) => {
		//  config.data = JSON.stringify(config.data);
		//  config.headers = {
		// //    "Content-Type": "application/json",
		//  };
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log("请求出错：", error);
		showAPIMessage(error);
		return Promise.reject(error);
	}
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params,
		}).then((response) => {
			resolve(response);
			// if (!isEmpty(response.data) && response.data.errorCode === 0) {
			// 	resolve(response);
			// } else {
			// 	reject(response);
			// }
		})
		.catch((error) => {
			reject(error);
		});
	});
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(
			(response) => {
				resolve(response);
				// if (!isEmpty(response.data) && response.data.errorCode === 0) {
				// 	resolve(response);
				// } else {
				// 	reject(response);
				// }
			},
			(err) => {
				reject(err);
			}
		);
	});
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data).then(
			(response) => {
				resolve(response);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(
			(response) => {
				resolve(response);
			},
			(err) => {
				reject(err);
			}
		);
	});
}

//统一接口处理，返回数据
export const apiAxios = (fecth, url, param, dispatch) =>{
	console.log("begin a request,and url:", url);
	//显示进度条
	dispatch(showLoading());
	return new Promise((resolve, reject) => {
		switch (fecth) {
			case "get":
				get(url, param)
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						console.log("get request GET failed.", error);
						reject(error);
					})
					.then(() => {
						//隐藏进度条
						dispatch(hideLoading());
					});
				break;
			case "post":
				post(url, param)
					.then((response) =>  {
						resolve(response);
					})
					.catch((error) => {
						console.log("get request POST failed.", error);
						reject(error);
					})
					.then(() => {
						//隐藏进度条
						dispatch(hideLoading());
					});
				break;
				case "put":
					put(url, param)
						.then((response) =>  {
							resolve(response);
						})
						.catch((error) => {
							console.log("get request PUT failed.", error);
							reject(error);
						})
						.then(() => {
							//隐藏进度条
							dispatch(hideLoading());
						});
				break;
				case "patch":
					patch(url, param)
						.then((response) =>  {
							resolve(response);
						})
						.catch((error) => {
							console.log("get request PATCH failed.", error);
							reject(error);
						})
						.then(() => {
							//隐藏进度条
							dispatch(hideLoading());
						});
					break;
			default:
				break;
		}
	});
	
}

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};


const paramNameArray = {
	'email': '邮箱',
	'username': '用户名',
	'password':'密码',
	'username|email|phone': '账户名称',
	'veriCode': '验证码',
	'new_password': '新密码'
};

const apiErrCodeMessageBuilder = (res) => {
	const credentialMessage = () => {
		if (res.data.credential === 'password') {
			return '账户或密码错误'
		} else if (res.data.credential === 'phrase')  {
			return '验证码错误'
		}
	}
	const templateMessage = {
		[ErrCode.UNKNOWN_INNER_ERROR]: '未知错误，请联系开发者',
		[ErrCode.STORAGE_ENGINE_ERROR]: '',
		[ErrCode.INNER_ARGUMENT_ERROR]: '',
		[ErrCode.SENDER_SERVICE_ERROR]: '邮箱验证发送失败，请检查邮箱是否正确',
		[ErrCode.ITEM_NOT_FOUND_ERROR]: '未找到',
		[ErrCode.ITEM_ALREADY_EXIST_ERROR]: `${paramNameArray[res.data.item]}已经存在`,
		[ErrCode.ITEM_EXPIRED_OR_USED_ERROR]: `${paramNameArray[res.data.item]}过期或被使用`,
		[ErrCode.PERMISSION_DENIED]: '权限不足',
		[ErrCode.CREDENTIAL_NOT_MATCH]: `${credentialMessage()}`,
		[ErrCode.REQUEST_PARAM_FORMAT_ERROR]: `请检查${paramNameArray[res.data.errorParam]}`,
	};
	return templateMessage[res.data.errorCode];
};

const showAPIMessage = (err) => {
	if (err && err.response) {
		// console.log(apiErrCodeMessageBuilder(err.response));
		message.error(apiErrCodeMessageBuilder(err.response));
	}
}



export const WebAPI= {
    logout: (dispatch) => {
        // document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // dispatch(hideSpinner());  
        // browserHistory.push('/'); 
    },

	//获取验证码
	getCaptcha: async (dispatch) => {
		
		//设置验证码的合法标志位
		dispatch(setUser({ key: 'captchaValidState', value: CAPTCHASTATE.INVALID }));
		dispatch(setUser({ key: 'isCaptchaGotten', value: false }));

		return new Promise((resolve, reject) => {
			apiAxios('get', ApiUrl.captchaApi, {
				width: 150,
				height: 40
			}, dispatch).then(
				(response) => {
					resolve(response);
					console.log(response.data);
					if (response.data.errorCode === ErrCode.NO_ERROR) {
						console.log('获取到验证码')
						//设置验证id和图片base64
						dispatch(setUser({ key: 'captchaId', value: response.data.data.captcha_id }));
						dispatch(setUser({ key: 'captchaImgBase64', value: 'data:image/jpeg;base64,' + response.data.data.captcha_data.jpegBase64 }));
						//设置获取到验证码的标志位，在submit后要注意清除
						dispatch(setUser({ key: 'isCaptchaGotten', value: true }));
					}
				},
				(err) => {
					message.error('验证码获取失败')
					dispatch(setUser({ key: 'isCaptchaGotten', value: false }));
					// console.log(err);
				}
			)
		});
	},
	
	//验证码判断
    verifyCaptcha: async (dispatch, captchaId, captchaInputValue) => {
		return new Promise((resolve, reject) => {
			apiAxios('get', ApiUrl.captchaApi + '/' + captchaId + '/submitResult', {
				phrase: captchaInputValue
			}, dispatch).then(
				(response) => {
					resolve(response);
					console.log(response.data);
					if (response.data.errorCode === ErrCode.NO_ERROR) {
						message.success('验证码正确')
						console.log('验证码正确')
						//设置验证码的合法标志位
						dispatch(setUser({ key: 'captchaValidState', value: CAPTCHASTATE.OK }));
					}
				},
				(err) => {
					//验证码刷新重来
					dispatch(getCaptcha(dispatch));
					dispatch(setUser({ key: 'isCaptchaInputEnabled', value: false }));
				}
			).then(() => {
				//通过状态切换触发重置
				dispatch(setUser({ key: 'isCaptchaInputEnabled', value: true }));
			})
		});
			
	},

	//提交注册
    submitSignUp: async (dispatch, username, email, password, captchaId) => {
		return new Promise((resolve, reject) => {
			apiAxios('post', ApiUrl.userApi, {
				username: username,
				password: password,
				email: email,
				captcha_id: captchaId
			}, dispatch).then(
				(response) => {
					resolve(response);
					console.log(response.data);
					if (response.data.errorCode === ErrCode.NO_ERROR) {
						message.success('初步注册成功')
						console.log('初步注册成功，需进行邮箱验证');
						//继续填写信息
						dispatch(setSignUpPage({ key: 'page', value: SIGNUPPAGE.MORE_INFO }));
					}
				},
				(err) => {
					dispatch(setSignUpPage({ key: 'page', value: SIGNUPPAGE.INFO_FORM }));
				}
			)
		});
	},
	
	//提交登录
	submitSignIn: async (dispatch, username, email, password, captchaId) => {
		return new Promise((resolve, reject) => {
			apiAxios('post', ApiUrl.userSignInApi, {
				// username: username,
				password: password,
				email: email,
				captcha_id: captchaId
			}, dispatch).then(
				(response) => {
					if (response.data.errorCode === ErrCode.NO_ERROR) {
						message.success('登录成功')
						console.log('登录成功');
						dispatch(setSignUpPage({ key: 'page', value: SIGNINPAGE.COMPLETE }));
	
						setTimeout(() => {
							//跳转链接
							const callBackUrl = getUrlParameter(URLPARAMETER.CALLBACK);
							console.log(isHttpUrl(callBackUrl))
							if (isEmpty(callBackUrl) || !isHttpUrl(callBackUrl)) {
								console.log('登录跳转无URL或不合法')
								window.location.href = 'https://www.baidu.com/';
							}
							else {
								console.log('回调url:', callBackUrl)
								window.location.href = callBackUrl;
							}
						}, 2000);
					}
				},
				(err) => {
					if (err.response.data.errorCode === ErrCode.PERMISSION_DENIED) {
						// message.info('若您刚注册，请检查账户是否通过验证', 6);
						confirm({
							title: '提示',
							content: '您的账号无法登陆，可能是因为没有通过验证，请检查邮箱是否收到过验证邮件，或点击下方按钮，我们将为您重新发送验证码。',
							okText: '重新发送',
							cancelText: '取消',
							onOk:()=> {
								WebAPI.resendEmail(dispatch, email, captchaId);
							}
						  });
					}
					
					dispatch(setSignUpPage({ key: 'page', value: SIGNINPAGE.INFO_FORM }));
				}
			)
		});
	},

	//重新发送验证邮件
	resendEmail: async (dispatch, email, captchaId) => {
		return new Promise((resolve, reject) => {
			apiAxios('post', ApiUrl.resendEmailApi, {
				email: email,
				captcha_id: captchaId
			}, dispatch).then(
				(response) => {
					message.success('发送成功');
				},
				(err) => {
					message.error('发送失败')
				}
			)
		});
	},

	//获得重设密码的验证码
	getResetPwdVCode: async (dispatch, username, email, password, captchaId) => {
		return new Promise((resolve, reject) => {
			apiAxios('post', ApiUrl.getResetPwdVCodeApi, {
				email: email,
				captcha_id: captchaId
			}, dispatch).then(
				(response) => {
					message.success('发送成功');
					dispatch(setResetPwdPage({ key: 'page', value: RESETPWDPAGE.COMPLETE_SENDVCODE }));
				},
				(err) => {
					message.error('发送失败')
				}
			)
		});
	},

	//重设密码
	submitResetPwd: async (dispatch, vericode, newPassword) => {
		return new Promise((resolve, reject) => {
			apiAxios('patch', ApiUrl.resetPwdApi, {
				veriCode: vericode,
				new_password: newPassword
			}, dispatch).then(
				(response) => {
					message.success('重设成功');
					dispatch(setResetPwdPage({ key: 'page', value: RESETPWDPAGE.COMPLETE_RESET }));
				},
				(err) => {
					message.error('重设失败')
					console.log(err.response.data)
				}
			)
		});
	},

	//验证账号
	verifyAccount: async (dispatch, vericode) => {
		return new Promise((resolve, reject) => {
			apiAxios('get', ApiUrl.verifyEmailApi +'/' + vericode, {
			}, dispatch).then(
				(response) => {
					console.log(response.data);
					if (response.data.errorCode === ErrCode.NO_ERROR) {
						message.success('邮箱验证成功');
						console.log('邮箱验证成功');
						dispatch(setVerifyPage({ key: 'page', value: VERIFYPAGE.COMPLETE }));
					}
				},
				(err) => {
					message.error('邮箱验证失败');
					console.log('邮箱验证失败');
					console.log(err);
					setTimeout(() => {
						window.location.href = '/signin';
					}, 2000);
				}
			)
		});
	},
	
};

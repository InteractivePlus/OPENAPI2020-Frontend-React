export const Setting = {
	USER_SYSTEM_NAME: {
		zh_CN: "幽径",
		en_US: "Solitary Trail",
	},
	THIRD_PARTY_SYSTEM_NAME: {
		zh_CN: "幽享",
		en_US: "Solitary Share",
	},
	THIRD_PARTY_SYSTEM_LINKS: {},

	USERNAME_MINLEN: 1,
	USERNAME_MAXLEN: 20,
	USERNAME_REGEX: /./,

	DISPLAYNAME_MINLEN: 1,
	DISPLAYNAME_MAXLEN: 15,
	DISPLAYNAME_REGEX: /./,

	SIGNATURE_MAXLEN: 40,
	SIGNATURE_REGEX: /./,

	EMAIL_MAXLEN: 50,

	PASSWORD_MINLEN: 8,
	PASSWORD_MAXLEN: 40,
	PASSWORD_REGEX: /./,

	AVATOR_MAX_SIZE: 200,

	PASSWORD_SALT: "",
	TOKEN_SALT: "",
	VERIFICATION_CODE_SALT: "",

	TOKEN_AVAILABLE_DURATION: 3600,
	VERIFICATION_CODE_AVAILABLE_DURATION: 300,

	DEFAULT_COUNTRY: "CN",
	DEFAULT_LOCALE: "zh_CN",

	DEFAULT_GROUP_PERMISSION: {
		createApp: false,
		numAppLimit: 1,
	},
	ALLOW_TOKEN_IP_CHANGE: true,
	DEBUG_MODE: true,
};

export const ErrCode = {
    NO_ERROR: 0,
    UNKNOWN_INNER_ERROR: 1,
    STORAGE_ENGINE_ERROR: 2,
    INNER_ARGUMENT_ERROR: 3,
    SENDER_SERVICE_ERROR: 4,
    ITEM_NOT_FOUND_ERROR: 10,
    ITEM_ALREADY_EXIST_ERROR: 11,
    ITEM_EXPIRED_OR_USED_ERROR: 12,
    PERMISSION_DENIED: 13,
    CREDENTIAL_NOT_MATCH: 14,
	REQUEST_PARAM_FORMAT_ERROR: 20
};

//https://api.interactivepdk.com/
// const serviceRootUrl = 'http://81.71.84.198:8899/'
const serviceRootUrl = 'https://api.interactivepdk.com/'

export const ApiUrl = {
	captchaApi:serviceRootUrl+'captcha',				//验证码接口
	userApi: serviceRootUrl + 'user', 					//用户接口
	userSignInApi: serviceRootUrl + 'user/token', 		//用户登录接口
	verifyEmailApi: serviceRootUrl +'vericodes/verifyEmailResult', //邮箱验证接口
	resendEmailApi: serviceRootUrl + 'vericodes/sendAnotherVerifyEmailRequest', //重新发送验证邮件接口
	getResetPwdVCodeApi: serviceRootUrl + 'vericodes/changePasswordRequest', //获得重设密码的验证码接口
	resetPwdApi: serviceRootUrl + 'user/password', //重设密码的接口
}

export const URLPARAMETER = {
	CALLBACK: 'callback',
	APPID: 'appid',
	VERIFY: 'veriCode'
}

export const ACTIONTYPES = {
	GET_CAPTCHA: "GET_CAPTCHA",
	CLEAR_CAPTCHA: "CLEAR_CAPTCHA",
	VERIFY_CAPTCHA: "VERIFY_CAPTCHA",
	AUTH_START: "AUTH_START",
	AUTH_COMPLETE: "AUTH_COMPLETE",
	AUTH_ERROR: "AUTH_ERROR",
	START_LOGOUT: "START_LOGOUT",
	CHECK_AUTH: "CHECK_AUTH",
	SET_USER: "SET_USER",
	SHOW_SPINNER: "SHOW_SPINNER",
	HIDE_SPINNER: "HIDE_SPINNER",
	SHOW_LOADING: "SHOW_LOADING",
	HIDE_LOADING: "HIDE_LOADING",
	SET_UI: "SET_UI",
	GET_RECIPES: 'GET_RECIPES',
	SET_RECIPE: 'SET_RECIPE',
	ADD_RECIPE: 'ADD_RECIPE',
	UPDATE_RECIPE: 'UPDATE_RECIPE',
	DELETE_RECIPE: 'DELETE_RECIPE',

	//设置注册页面页数
	SET_SIGNUP_PAGE: 'SET_SIGNUP_PAGE',
	//设置注册页面页数为起始页
	SET_SIGNUP_PAGE_START: 'SET_SIGNUP_PAGE_START',
	//提交注册请求
	SUBMIT_SIGNUP: 'START_SIGNUP',
	
	//设置登录页面页数
	SET_SIGNIN_PAGE: 'SET_SIGNUP_PAGE',
	//提交登录请求
	SUBMIT_SIGNIN: 'START_SIGNIN',

	//设置验证账号页面页数
	SET_VERIFY_PAGE: 'SET_VERIFY_PAGE',
	//提交验证账号请求
	SUBMIT_VERIFY: 'SUBMIT_VERIFY',

	//设置忘记密码页面页数
	SET_RESETPWD_PAGE: 'SET_RESETPWD_PAGE',
	//提交获取忘记密码验证码请求
	SUBMIT_RESETPWD_VCODE: 'SUBMIT_RESETPWD_VCODE',
	//提交获取忘记密码验证码请求
	SUBMIT_RESETPWD_NEW: 'SUBMIT_RESETPWD_NEW',
}


export const CAPTCHASTATE = {
	INVALID: 0,
	OK: 1,
	USED: 2
}

export const SIGNUPPAGE = {
	EMPTY_PAGE: 0,
	INFO_FORM: 1,
	CAPTCHA: 2,
	MORE_INFO: 3,
	COMPLETE: 4,
}

export const SIGNINPAGE = {
	EMPTY_PAGE: 0,
	INFO_FORM: 1,
	CAPTCHA: 2,
	COMPLETE: 3,
}


export const VERIFYPAGE = {
	EMPTY_PAGE: 0,
	WAIT_PAGE: 1,
	COMPLETE: 2,
}

export const RESETPWDPAGE = {
	EMPTY_PAGE: 0,
	INFO_FORM: 1,
	CAPTCHA: 2,
	COMPLETE_SENDVCODE: 3,
	NEW_PWD: 4,
	COMPLETE_RESET: 5,
}



//export default _Setting;

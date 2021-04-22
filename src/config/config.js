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

//http://pdk.xsyds.cn:8899/
const serviceRootUrl = 'http://81.71.84.198:8899/'

export const ApiUrl = {
	captchaApi:serviceRootUrl+'captcha',				//验证码接口
	userApi: serviceRootUrl + 'user', 					//用户接口
	userSignInApi: serviceRootUrl + 'user/token', 		//用户登录接口
	verifyEmailApi: serviceRootUrl +'vericodes/verifyEmailResult' //邮箱验证接口
	
}

export const URLPARAMETER = {
	CALLBACK: 'callback',
	APPID: 'appid',
	VERIFY: 'veriCode'
}


//export default _Setting;

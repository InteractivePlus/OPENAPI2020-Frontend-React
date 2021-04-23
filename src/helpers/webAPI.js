import React from "react";
import axios from 'axios'
import { Setting, ErrCode, ApiUrl } from "../config/config.js";

import { 
    authComplete,
    authError,
    completeLogout,
  } from '../actions';
  

export default {
    logout: (dispatch) => {
        // document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // dispatch(hideSpinner());  
        // browserHistory.push('/'); 
    },

    getCaptcha: (dispatch) => {
        // await axios.get(ApiUrl.captchaApi, {
		// 	width: 150,
		// 	height: 40
		// })
		// 	.then((response) => {
		// 		console.log(response.data);
		// 		if (response.data.errorCode === ErrCode.NO_ERROR) {
		// 			console.log('获取到验证码')
		// 			captchaId = response.data.data.captcha_id;
		// 			setCaptchaId(response.data.data.captcha_id);
		// 			setCaptchaImgBase64('data:image/jpeg;base64,' + response.data.data.captcha_data.jpegBase64);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		message.error('验证码获取失败')
		// 		console.log(error);
		// 	})
		// 	.then(() => {
		// 		//无论有没有成功都在执行完成后打印id看看
		// 		console.log(captchaId)
		// 	});
        console.log('开始获取验证码');
    }
};
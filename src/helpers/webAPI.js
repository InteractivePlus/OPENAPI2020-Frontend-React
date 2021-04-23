import React from "react";
import axios from 'axios'
import { Setting, ErrCode, ApiUrl } from "../config/config.js";

import { 
    authComplete,
    authError,
    completeLogout,
    setUser
} from '../actions';

import {store} from '../store/configureStore';

export default {
    logout: (dispatch) => {
        // document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // dispatch(hideSpinner());  
        // browserHistory.push('/'); 
    },

    getCaptcha: async (dispatch) => {
        
        console.log('开始获取验证码redux');
        
        await axios.get(ApiUrl.captchaApi, {
			width: 150,
			height: 40
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					console.log('获取到验证码')
                    //设置验证id和图片base64
                    dispatch(setUser({ key: 'captchaId', value: response.data.data.captcha_id }));
                    dispatch(setUser({ key: 'captchaImgBase64', value: 'data:image/jpeg;base64,' + response.data.data.captcha_data.jpegBase64 }));
                    //设置获取到验证码的标志位，在submit后要注意清除
                    dispatch(setUser({ key: 'isCaptchaGotten', value: true }));
                }
			})
			.catch((error) => {
				// message.error('验证码获取失败')
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				// console.log(captchaId)
                console.log(store.getState())
			});

        console.log('开始获取验证码redux end');
    }
};
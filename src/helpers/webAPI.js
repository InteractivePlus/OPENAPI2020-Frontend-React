/**
 * @file WebAPI接口库
 * @version v1.0
 */
import React from "react";
import axios from 'axios'
import { Setting, ErrCode, ApiUrl, CAPTCHASTATE, SIGNUPPAGE } from "../config/config.js";

import {
    showLoading,
    hideLoading,
    setSignUpPage,
    authComplete,
    authError,
    completeLogout,
    setUser,
    getCaptcha,
} from '../actions';

import { message } from 'antd';


import {store} from '../store/configureStore';

export default {
    logout: (dispatch) => {
        // document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // dispatch(hideSpinner());  
        // browserHistory.push('/'); 
    },

    getCaptcha: async (dispatch) => {
        // console.log('开始获取验证码redux');
        
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
                    // dispatch(setUser({ key: 'isCaptchaGotten', value: true }));
                }
			})
			.catch((error) => {
				message.error('验证码获取失败')
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				// console.log(captchaId)
                console.log(store.getState())
			});
		
		//设置验证码的合法标志位
		dispatch(setUser({ key: 'captchaValidState', value: CAPTCHASTATE.INVALID }));
        // console.log('开始获取验证码redux end');
    },
    verifyCaptcha: async (dispatch, captchaId, captchaInputValue) => {
        console.log('开始验证验证码redux');

		//验证码判断
		await axios.get(ApiUrl.captchaApi +'/' + captchaId + '/submitResult', {
			params: {
				phrase: captchaInputValue
			}
		})
			.then((response) => {
				console.log(response.data);
                if (response.data.errorCode === ErrCode.NO_ERROR) {
                    //设置验证码的合法标志位
                    dispatch(setUser({ key: 'captchaValidState', value: CAPTCHASTATE.OK }));
					
					console.log('验证通过')
				}
			})
            .catch((error) => {
                //设置验证码的合法标志位
                dispatch(setUser({ key: 'captchaValidState', value: CAPTCHASTATE.INVALID }));
                //验证码刷新重来
                dispatch(getCaptcha(dispatch));
				message.error('验证码有误')
				console.log(error);
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(captchaId)
			});
    },
    submitSignUp: async (dispatch, username, email, password, captchaId) => {
        //显示进度条
        dispatch(showLoading());

        //发送请求
		await axios.post(ApiUrl.userApi, {
			username: username,
			password: password,
			email: email,
			captcha_id: captchaId
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.errorCode === ErrCode.NO_ERROR) {
					message.success('初步注册成功')
                    console.log('初步注册成功，需进行邮箱验证');
                    //继续填写信息
                    dispatch(setSignUpPage({ key: 'page', value: SIGNUPPAGE.MORE_INFO }));
				}
			})
			.catch((error) => {
				console.log(error.response);
				switch (error.response.data.errorCode) {
					case ErrCode.ITEM_ALREADY_EXIST_ERROR:
						console.log('用户已存在');
						message.error('用户已存在');
						break;
					case ErrCode.SENDER_SERVICE_ERROR:
						console.log('邮箱验证发送失败，请检查邮箱是否正确');
						message.error('邮箱验证发送失败，请检查邮箱是否正确');
						break;
					case ErrCode.REQUEST_PARAM_FORMAT_ERROR:
						let checkItem = '';
						if(error.response.data.errorParam==='email')
						{
							checkItem = '邮箱';
						}
						else if(error.response.data.errorParam==='username')
						{
							checkItem = '用户名';
						}
						else if(error.response.data.errorParam==='password')
						{
							checkItem = '密码';
						}
						console.log('无法注册，请检查'+checkItem+'是否正确');
						message.error('无法注册，请检查'+checkItem+'是否正确');
						break;
					default:
						message.error('未知错误，请联系开发者');
				}
				dispatch(setSignUpPage({ key: 'page', value: SIGNUPPAGE.INFO_FORM }));
			})
			.then(() => {
				//无论有没有成功都在执行完成后打印id看看
				console.log(captchaId)
            });
        //隐藏进度条
        dispatch(hideLoading());
	},
	
	submitSignIn: async (dispatch, username, email, password, captchaId) => {
		//显示进度条
		dispatch(showLoading());
		setTimeout(() => {
			//隐藏进度条
			dispatch(hideLoading());
		}, 1000);
		
	}
};
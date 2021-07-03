import React from "react";
import axios from 'axios'
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  LinearProgress, Collapse } from "@material-ui/core";
import { FlexCard, XsydCardContainer,CodeInput } from "../../components";

import { useViewSize, getUrlParameter, isEmpty} from "../../utils";
import { URLPARAMETER, VERIFYPAGE } from "../../config/config.js";
import "../../static/css/logcommon.css";

import { connect } from 'react-redux';


import {
	getCaptcha,
	setVerifyPage,
	submitVerify,
} from '../../actions';
  


//普通按需加载，会有样式污染
//但真的比materialui的消息框好看
//那个太难看了而且使用、自定义还烦，和审美、正常的编程逻辑严重不符
import { message } from 'antd';

//指定按需加载，可避免样式污染，但是会没有动画
//import message from 'antd/lib/message'
//import 'antd/lib/message/style/index.css'

const VerifyPage = (props) => {

	//从props中引入状态和方法
	const {
		page
	} = props;
	const {
		onTurnToPage,
		onVerify
	} = props;
    

	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();

	let handleGoLogin = (event) => {
		props.history.push("/signin");
	};


	// 相当于componentDidMount
	// 这里加一个从0跳转到第1页，用来触发动画
    React.useEffect(() => {
		//跳转到等待页
		onTurnToPage(VERIFYPAGE.WAIT_PAGE);

		//判断验证码
		let vericode = getUrlParameter(URLPARAMETER.VERIFY);
		if (!isEmpty(vericode)) {
			console.log("注册验证码：", vericode);
			onVerify(vericode);
		}
		else {
			console.log('无注册验证');
			props.history.push("/signin");
		}
	}, []);

	return (
		<>
			<Container maxWidth={isMobile ? false : "xs"} className={isMobile ? "" : "container"}>
				<FlexCard size={isMobile ? "small" : "large"}>
					<Collapse in={page === VERIFYPAGE.EMPTY_PAGE}></Collapse>
					<Collapse in={page === VERIFYPAGE.WAIT_PAGE}>
						<CardContent className={page === VERIFYPAGE.WAIT_PAGE ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">我们正在验证您的账号，请稍等。</div>
								
							</XsydCardContainer>
						</CardContent>

					</Collapse>
					<Collapse in={page === VERIFYPAGE.COMPLETE}>
						<CardContent className={page === VERIFYPAGE.COMPLETE ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">恭喜您，验证完成。</div>
								<div className="space-justify-view">
									即将自动跳转到登录页面，或手动点击登录。
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
		page: state.getIn(['userVerify', 'page']),
	}),
	(dispatch) => ({
		//转到指定页
		onTurnToPage: (pageIndex) => {
			//如果是跳转到验证码页要刷新一下
			if (pageIndex === VERIFYPAGE.CAPTCHA){
				dispatch(getCaptcha(dispatch));
			}
			//跳转到指定页
			dispatch(setVerifyPage({ key: 'page', value: pageIndex }));
		},
		//开始验证
        onVerify: (vericode) => {
            dispatch(submitVerify(dispatch, vericode));
        },
	}),
)(VerifyPage);



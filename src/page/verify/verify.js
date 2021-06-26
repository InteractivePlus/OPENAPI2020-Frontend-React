import React from "react";
import axios from 'axios'
import { Container, CardContent, TextField, Link,
	 Button, Grid, FormControlLabel, Checkbox,
	  LinearProgress, Collapse } from "@material-ui/core";
import { FlexCard, XsydCardContainer,CodeInput } from "../../components";

import {useViewSize} from "../../utils";

import { Setting, ErrCode, ApiUrl } from "../../config/config.js";
import "../../static/css/logcommon.css";
import "../../static/css/register.css";

//普通按需加载，会有样式污染
//但真的比materialui的消息框好看
//那个太难看了而且使用、自定义还烦，和审美、正常的编程逻辑严重不符
import { message } from 'antd';

//指定按需加载，可避免样式污染，但是会没有动画
//import message from 'antd/lib/message'
//import 'antd/lib/message/style/index.css'

function VerifyPage(props) {

	//原准备获取客户端宽度，现直接拿isMobile
	const { isMobile } = useViewSize();
	//控制页面切换
	let [page, setPage] = React.useState(1);
	//控制进度条显示
	let [isLoading, setLoading] = React.useState(false);
	
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

export default VerifyPage;

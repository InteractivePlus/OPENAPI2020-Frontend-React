import React from "react";
import SwipeableViews from "react-swipeable-views";

import {
	CssBaseline,
	Container,
	CardContent,
	Typography,
	TextField,
	Link,
	Button,
	Grid,
	FormControlLabel,
	Checkbox,
	LinearProgress,
	Collapse,
	Tabs,
	Tab,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import FlexCard from "../component/flex_card.js";
import TabPanel from "../component/tab_panel.js";
import XsydCardContainer from "../component/xsyd_card_container.js";
import Setting from "../config/config.js";
import "../static/css/logcommon.css";
import "../static/css/register.css";


const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1890FF",
		},
		secondary: {
			main: "#64b5f6",
		},
	},
});

function Register(props) {
	let [protocol, setProtocol] = React.useState(false);
	let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);
	let [page, setPage] = React.useState(1);
	let [loading, setLoading] = React.useState(false);
	let [tabs, setTabs] = React.useState(0);

	let pageMaxCount = 4;//增加新collapse时记得调整最大页数

	let handleResize = () => {
		setClientWidth(document.body.clientWidth);
	};

	let handleProtocolChange = (event) => {
		setProtocol(event.target.checked);
	};

	let handleNextPage = (event) => {
		// 验证表单

		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			if (page < pageMaxCount) {
				setPage(page + 1);
			}
		}, 1000);
	};

	let handlePreviousPage = (event) => {
		setPage(1);
	};


	let handleChangeTab = (event, newValue) => {
		setTabs(newValue);
	};

	let handleChangeIndex = (index) => {
		setTabs(index);
	};

	let handleGoLogin = (event) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			props.history.push('/login')
		}, 1000);
	};

	window.addEventListener("resize", handleResize);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="progress-placeholder">
					<Collapse in={loading}>
						<LinearProgress />
					</Collapse>
				</div>

				<Container maxWidth={clientWidth <= 600 ? false : "xs"} className={clientWidth <= 600 ? "" : "container"}>
					<div>
						<FlexCard size={clientWidth <= 600 ? "small" : "large"}>

							<Collapse in={page === 1}>
								<CardContent className={page === 1 ? "register-card" : "register-card-none"}>
									<XsydCardContainer title="注册您的形随意动账号" subtitle="一个账号，畅享BlueAirLive所有服务">
										<div>
											<TextField className="input" label="用户名" />
											<TextField className="input" label="电子邮箱" />
											<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>

											<TextField className="input" label="密码" />
											<TextField className="input" label="确认密码" />
											<p className="password-tip-text">
												使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（必须包含字母和数字）
											</p>
										</div>

										<FormControlLabel
											control={
												<Checkbox
													checked={protocol}
													size="small"
													onChange={handleProtocolChange}
													name="protocol"
													color="primary"
												/>
											}
											label={
												<div style={{ fontSize: "0.8em" }}>
													我已阅读并同意<Link href="#">《用户协议》</Link>
												</div>
											}
										/>
										<Grid container justify="center" alignItems="center">
											<Grid item xs={6}>
												<Link href="/#/login">登录账号</Link>
											</Grid>
											<Grid item xs={6} className="options-right">
												<Button variant="contained" color="primary" onClick={handleNextPage} disabled={!protocol} disableElevation>
													下一步
												</Button>
											</Grid>
										</Grid>
									</XsydCardContainer>
								</CardContent>
							</Collapse>

							<Collapse in={page === 2} >
								<CardContent className={page === 2 ? "validation-card" : "validation-card-none"}>
									<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
										<div className="space-justify-view">
											<TextField className="input" label="验证码" />
										</div>

										<Grid container justify="center" alignItems="center">
											<Grid item xs={6}>
												<Link href="/#/register" onClick={handlePreviousPage}>返回</Link>
											</Grid>
											<Grid item xs={6} className="options-right">
												<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
													下一步
												</Button>
											</Grid>
										</Grid>
									</XsydCardContainer>
								</CardContent>
							</Collapse>

							<Collapse in={page === 3} >
								<CardContent className={page === 3 ? "validation-card" : "validation-card-none"}>
									<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
										<div className="space-justify-view">
											<TextField className="input" label="手机号" />
											<TextField className="input" label="国家/地区" />
											<TextField className="input" label="语言选择" />
										</div>

										<Grid container justify="center" alignItems="center">
											<Grid item xs={6}>
												<Link href="/#/register" onClick={handlePreviousPage}>返回</Link>
											</Grid>
											<Grid item xs={6} className="options-right">
												<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
													下一步
												</Button>
											</Grid>
										</Grid>
									</XsydCardContainer>
								</CardContent>
							</Collapse>

							<Collapse in={page === 4} >
								<CardContent className={page === 4 ? "validation-card" : "validation-card-none"}>
									<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
										<div className="space-justify-view">
											恭喜您，注册完成
											
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
					</div>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default Register;

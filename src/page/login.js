import React from "react";
import SwipeableViews from "react-swipeable-views";
import Logo from "../static/logo.png";

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
import Setting from "../config/config.js";
import "../static/css/logcommon.css";
import "../static/css/login.css";

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

function Login() {
	let [protocol, setProtocol] = React.useState(false);
	let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);
	let [page, setPage] = React.useState(1);
	let [loading, setLoading] = React.useState(false);
	let [tabs, setTabs] = React.useState(0);

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
			setPage(2);
		}, 1000);
	};

	let handleChangeTab = (event, newValue) => {
		setTabs(newValue);
	};

	let handleChangeIndex = (index) => {
		setTabs(index);
	};

	window.addEventListener("resize", handleResize);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Collapse in={loading}>
					<LinearProgress />
				</Collapse>
				<Container maxWidth={clientWidth <= 600 ? false : "xs"} className={clientWidth <= 600 ? "" : "container"}>
					<div>
						<FlexCard size={clientWidth <= 600 ? "small" : "large"}>
							<Collapse in={page === 1}>
								<CardContent className={page === 1 ? "validation-card" : "validation-card-none"}>
									<div className="register-tip">
										<img className="logo" src={Logo} alt="Logo" />
										<Typography className="register-tip-text" variant="h1">
											登录
										</Typography>
										<p className="project-tip-text">一个账号，畅享BlueAirLive所有服务</p>
										<Tabs
											value={tabs}
											onChange={handleChangeTab}
											indicatorColor="primary"
											textColor="primary"
											variant="fullWidth"
										>
											<Tab label="密码登录" />
											<Tab label="短信验证码登录" />
										</Tabs>
										<div className="tab-view">
										<SwipeableViews
											axis={theme.direction === "rtl" ? "x-reverse" : "x"}
											index={tabs}
											onChangeIndex={handleChangeIndex}
										>
											<TabPanel value={tabs} index={0} dir={theme.direction}>
												<TextField className="input" label="邮箱或手机号码" />
												<TextField className="input" label="密码" />
											</TabPanel>
											<TabPanel value={tabs} index={1} dir={theme.direction}>
												<TextField className="input" label="手机号码" />
												<TextField className="input" label="验证码" />
											</TabPanel>
										</SwipeableViews>
										</div>

										<Grid container justify="center" alignItems="center">
											<Grid item xs={6} className="options-left">
												<Link href="/#/register">注册账号</Link>
											</Grid>
											<Grid item xs={6} className="options-right">
												<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
													下一步
											</Button>
											</Grid>
										</Grid>
									</div>
								</CardContent>
							</Collapse>
							<Collapse in={page === 2}>
								<CardContent className={page === 2 ? "register-card" : "register-card-none"}>
									<div className="register-tip">
										<img className="logo" src={Logo} alt="Logo" />
										<Typography className="register-tip-text" variant="h1">
											登录验证
										</Typography>
										<p className="project-tip-text">一个账号，畅享BlueAirLive所有服务</p>
									</div>
									请手动返回

								</CardContent>
							</Collapse>
						</FlexCard>
					</div>
				</Container>
			</ThemeProvider>
		</>
	);
}


export default Login;

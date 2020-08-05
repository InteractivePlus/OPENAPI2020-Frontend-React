import React from "react";
import SwipeableViews from "react-swipeable-views";

import { Container, CardContent, TextField, Link, Button, Grid, LinearProgress, Collapse, Tabs, Tab } from "@material-ui/core";

import { FlexCard, TabPanel, XsydCardContainer } from "../../components";
// eslint-disable-next-line
import Setting from "../../config/config.js";
import "../../static/css/logcommon.css";
import "../../static/css/login.css";

function Login(props) {
	let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);
	let [page, setPage] = React.useState(1);
	let [loading, setLoading] = React.useState(false);
	let [tabs, setTabs] = React.useState(0);

	let handleResize = () => {
		setClientWidth(document.body.clientWidth);
	};

	let handleNextPage = (event) => {
		// 验证表单

		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setPage(2);
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

	let handleEnterDashboard = (event) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			props.history.push("/dashboard");
		}, 1000);
	};

	window.addEventListener("resize", handleResize);

	return (
		<>
			<div className="progress-placeholder">
				<Collapse in={loading}>
					<LinearProgress />
				</Collapse>
			</div>
			<Container maxWidth={clientWidth <= 600 ? false : "xs"} className={clientWidth <= 600 ? "" : "container"}>
				<FlexCard size={clientWidth <= 600 ? "small" : "large"}>
					<Collapse in={page === 1}>
						<CardContent className={page === 1 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="登录" subtitle="一个账号，畅享BlueAirLive所有服务">
								<Tabs value={tabs} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" variant="fullWidth">
									<Tab label="密码登录" />
									<Tab label="短信验证码登录" />
								</Tabs>
								<div className="space-justify-view">
									<SwipeableViews index={tabs} onChangeIndex={handleChangeIndex}>
										<TabPanel value={tabs} index={0}>
											<TextField className="input" label="邮箱或手机号码" />
											<TextField className="input" type="password" label="密码" />
										</TabPanel>
										<TabPanel value={tabs} index={1}>
											<TextField className="input" label="手机号码" />
											<TextField className="input" label="验证码" />
										</TabPanel>
									</SwipeableViews>
								</div>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={6} className="options-left">
										<Link href="/#/signup">注册账号</Link>
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
					<Collapse in={page === 2}>
						<CardContent className={page === 2 ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="登录验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								此处暂无
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6} className="options-left">
										<Link href="/#/signin" onClick={handlePreviousPage}>
											返回
										</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleEnterDashboard} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
				</FlexCard>
			</Container>
		</>
	);
}

export default Login;

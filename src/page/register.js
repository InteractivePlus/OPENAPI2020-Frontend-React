import React from "react";
import Logo from "../static/logo.png";
import { CssBaseline, Container, CardContent, Typography, TextField, Link, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FlexCard from "../component/flex_card.js";
import Setting from "../config/config.js";
import "../static/css/register.css";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1e88e5",
		},
		secondary: {
			main: "#64b5f6",
		},
	},
});

function Register() {
	let [protocol, setProtocol] = React.useState(false);
	let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);

	let handleResize = () => {
		setClientWidth(document.body.clientWidth);
	};

	let handleProtocolChange = (event) => {
		setProtocol(event.target.checked);
	};

	window.addEventListener("resize", handleResize);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth={clientWidth <= 600 ? false : "sm"} className={clientWidth <= 600 ? "" : "container"}>
					<div>
						<FlexCard size={clientWidth <= 600 ? "small" : "large"}>
							<CardContent className="login-card">
								<div className="register-tip">
									<img className="logo" src={Logo} alt="Logo" />
									<Typography className="register-tip-text" variant="h1">
										注册您的形随意动账号
									</Typography>
									<p className="project-tip-text">一个账号，畅享BlueAirLive所有服务</p>
								</div>

								<div>
									<TextField className="input" label="用户名" />
									<TextField className="input" label="电子邮箱" />
									<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>

									<TextField className="input" label="密码" />
									<TextField className="input" label="确认密码" />
									<p className="password-tip-text">
										使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（字母、数字和符号的组合）
									</p>
								</div>

								<FormControlLabel
									control={
										<Checkbox checked={protocol} size="small" onChange={handleProtocolChange} name="protocol" color="primary" />
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
										<Button variant="contained" color="primary">
											下一步
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</FlexCard>
					</div>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default Register;
